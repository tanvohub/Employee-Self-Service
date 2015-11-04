package gov.nysenate.ess.web.service.allowance;

import gov.nysenate.ess.web.model.allowances.AllowanceUsage;

public interface AllowanceService
{
    /**
     * Gets the allowance usage for a single employee over a given year
     * @param empId int
     * @param year int
     * @return AllowanceUsage
     */
    public AllowanceUsage getAllowanceUsage(int empId, int year);
}
