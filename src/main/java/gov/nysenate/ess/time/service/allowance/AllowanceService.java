package gov.nysenate.ess.time.service.allowance;

import gov.nysenate.ess.time.model.allowances.AllowanceUsage;
import gov.nysenate.ess.time.model.allowances.PeriodAllowanceUsage;

import java.time.LocalDate;
import java.util.List;
import java.util.SortedSet;

/**
 * @author Sam Stouffer
 *
 * Defines a service that provides allowance usage data for an employee.
 */
public interface AllowanceService
{

    /**
     * Gets a set of years for which the employee is an active temp employee with an allowance.
     *
     * @param empId int employee id
     * @return SortedSet<Integer>
     */
    SortedSet<Integer> getAllowanceYears(int empId);

    /**
     * Gets the allowance usage for a single employee over a given year.
     *
     * @param empId int
     * @param year int
     * @return AllowanceUsage
     */
    AllowanceUsage getAllowanceUsage(int empId, int year);

    /**
     * Get annual allowance usage before the given date.
     *
     * @param empId int
     * @param date LocalDate
     * @return {@link AllowanceUsage}
     */
    AllowanceUsage getAllowanceUsage(int empId, LocalDate date);

    /**
     * Get a list of allowance usage for each period in the given year.
     *
     * @param empId int
     * @param year  int
     * @return {@link List<PeriodAllowanceUsage>}
     */
    List<PeriodAllowanceUsage> getPeriodAllowanceUsage(int empId, int year);
}
