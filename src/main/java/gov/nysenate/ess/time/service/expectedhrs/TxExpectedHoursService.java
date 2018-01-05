package gov.nysenate.ess.time.service.expectedhrs;

import com.google.common.collect.ImmutableRangeSet;
import com.google.common.collect.Range;
import com.google.common.collect.RangeMap;
import com.google.common.collect.RangeSet;
import gov.nysenate.ess.core.model.payroll.PayType;
import gov.nysenate.ess.core.model.transaction.TransactionHistory;
import gov.nysenate.ess.core.service.transaction.EmpTransactionService;
import gov.nysenate.ess.core.util.DateUtils;
import gov.nysenate.ess.core.util.RangeUtils;
import gov.nysenate.ess.time.model.expectedhrs.ExpectedHours;
import gov.nysenate.ess.time.model.expectedhrs.InvalidExpectedHourDatesEx;
import gov.nysenate.ess.time.service.allowance.AllowanceService;
import gov.nysenate.ess.time.service.personnel.DockHoursService;
import gov.nysenate.ess.time.util.AccrualUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;

/**
 * @author Brian Heitner
 * @author Sam Stouffer
 *
 * Implements functionality defined in {@link ExpectedHoursService} using point in time values extracted from
 * employees' {@link TransactionHistory} retrieved from {@link EmpTransactionService}
 */
@Service
public class TxExpectedHoursService implements ExpectedHoursService {

    private static final Logger logger = LoggerFactory.getLogger(TxExpectedHoursService.class);

    private final EmpTransactionService empTransactionService;
    private final AllowanceService allowanceService;
    private final DockHoursService txDockHoursService;

    @Autowired
    public TxExpectedHoursService(EmpTransactionService empTransactionService,
                                  AllowanceService allowanceService,
                                  DockHoursService dockHoursService) {
        this.empTransactionService = empTransactionService;
        this.allowanceService = allowanceService;
        this.txDockHoursService = dockHoursService;
    }

    @Override
    public ExpectedHours getExpectedHours(int empId, Range<LocalDate> dateRange) throws InvalidExpectedHourDatesEx {
        dateRange = dateRange.canonical(DateUtils.getLocalDateDiscreteDomain());

        TransactionHistory transactionHistory = empTransactionService.getTransHistory(empId);

        LocalDate beginDate = DateUtils.startOfDateRange(dateRange);
        LocalDate endDate = DateUtils.endOfDateRange(dateRange);

        ExpectedHours.validateExpectedHourDates(beginDate, endDate);

        int year = beginDate.getYear();

        Range<LocalDate> yearToDate = Range.closedOpen(LocalDate.ofYearDay(year, 1), beginDate);

        BigDecimal yearlyHoursExpected = transactionHistory.getEffectiveMinHours(dateRange).lastEntry().getValue();

        BigDecimal ytdHoursExpected = getExpectedHours(transactionHistory, yearToDate);
        // Add any Temporary Actual Hours to the Expected Hours within the year prior to the given Pay Period.
        // Currently, the Temporary Hours included are only the Submitted Hours. RA/SA Hours include unsubmitted hours.
        // If including only Submitted Temporary Hours becomes an issue, then we may need to include all Temporary
        // Hours.
        BigDecimal tempHours = allowanceService.getAllowanceUsage(empId, beginDate).getHoursUsed();
        ytdHoursExpected = AccrualUtils.roundExpectedHours(ytdHoursExpected.add(tempHours));

        BigDecimal periodHoursExpected = getExpectedHours(transactionHistory, dateRange);

        return new ExpectedHours(beginDate, endDate, yearlyHoursExpected, ytdHoursExpected, periodHoursExpected);
    }

    /* --- Internal Methods --- */

    /**
     * Gets the number of hours expected of the employee over the given date range
     */
    private BigDecimal getExpectedHours(TransactionHistory transHistory, Range<LocalDate> dateRange) {

        RangeMap<LocalDate, BigDecimal> effectiveMinHoursMap = getEffectiveMinHoursMap(transHistory, dateRange);

        BigDecimal expectedHours = effectiveMinHoursMap.asMapOfRanges().entrySet().stream()
                .map(entry -> getExpectedHours(entry.getKey(), entry.getValue()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal dockedHours = txDockHoursService.getDockHours(transHistory.getEmployeeId(), dateRange);

        expectedHours = expectedHours.subtract(dockedHours);

        return expectedHours;
    }

    /**
     * Generates a range set that includes all dates for which an employee meets certain criteria that require them to
     * work a specific number of hours per pay period and record this time on a timesheet.
     * This includes all dates where the employee is:
     * - employed
     * - not on special leave
     * - not a senator
     * - not a temporary employee
     *
     * @param empTrans TransactionHistory - Employee Transaction History
     * @param dateRange Range<LocalDate> - date range to filter the result
     * @return ImmutableRangeSet<LocalDate>
     */
    private ImmutableRangeSet<LocalDate> getExpectedHourDates(TransactionHistory empTrans, Range<LocalDate> dateRange) {
        // Get a range set of dates where the employee is employed and required to enter time
        RangeSet<LocalDate> personnelStatusDates = empTrans.getPerStatusDates(
                perStat -> perStat.isEmployed() && perStat.isTimeEntryRequired()
        );

        RangeSet<LocalDate> nonSenatorDates = empTrans.getSenatorDates().complement();

        // Create a range set containing dates where the employee is regular / special annual
        RangeSet<LocalDate> annualEmploymentDates = empTrans.getPayTypeDates(PayType::isBiweekly);

        RangeSet<LocalDate> filterRangeSet = ImmutableRangeSet.of(dateRange);

        return ImmutableRangeSet.copyOf(
                RangeUtils.intersection(
                        Arrays.asList(personnelStatusDates, annualEmploymentDates, nonSenatorDates, filterRangeSet)
                )
        );
    }

    /**
     * Generates a range map containing the employee's minimum annual expected hours over time.
     * This range map will be filter to only contain entries within the given date range.
     *
     * @param empTrans TransactionHistory - Employee Transactions
     * @param dateRange Range<LocalDate> - date range
     * @return EmpTransactionService RangeMap<LocalDate, BigDecimal>
     */
    private RangeMap<LocalDate, BigDecimal> getEffectiveMinHoursMap(TransactionHistory empTrans,
                                                                    Range<LocalDate> dateRange) {
        RangeMap<LocalDate, BigDecimal> minHoursMap =
                RangeUtils.toRangeMap(empTrans.getEffectiveMinHours(DateUtils.ALL_DATES));

        ImmutableRangeSet<LocalDate> expectedHourDates = getExpectedHourDates(empTrans, dateRange);

        expectedHourDates.complement().asRanges()
                .forEach(minHoursMap::remove);

        return minHoursMap;
    }

    /**
     * Returns the expected hours for a given date range based on the Minimum Hours for the year.
     *
     * @param dateRange Range<LocalDate> - Date Range to get expected hours for
     * @return BigDecimal
     */
    private BigDecimal getExpectedHours(Range<LocalDate> dateRange, BigDecimal minHours) {

        BigDecimal numberOfWeekdays = new BigDecimal(DateUtils.getNumberOfWeekdays(dateRange));
        BigDecimal hoursPerDay = AccrualUtils.getHoursPerDay(minHours);
        BigDecimal rawExpectedHours = hoursPerDay.multiply(numberOfWeekdays);

        return AccrualUtils.roundExpectedHours(rawExpectedHours);
    }
}