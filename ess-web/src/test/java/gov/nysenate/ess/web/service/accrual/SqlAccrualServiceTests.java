package gov.nysenate.ess.web.service.accrual;

import gov.nysenate.ess.web.BaseTests;
import gov.nysenate.ess.core.dao.period.PayPeriodDao;
import gov.nysenate.ess.core.model.period.PayPeriod;
import gov.nysenate.ess.core.model.period.PayPeriodType;
import gov.nysenate.ess.core.util.OutputUtils;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class SqlAccrualServiceTests extends BaseTests
{
    private static final Logger logger = LoggerFactory.getLogger(SqlAccrualServiceTests.class);

    @Autowired
    private EssAccrualComputeService accService;

    @Autowired
    private PayPeriodDao payPeriodDao;

    @Test
    public void testGetAccruals() throws Exception {
        PayPeriod period = payPeriodDao.getPayPeriod(PayPeriodType.AF, LocalDate.of(2014, 9, 1));
        logger.info("{}", OutputUtils.toJson(accService.getAccruals(10976, period)));
    }
}
