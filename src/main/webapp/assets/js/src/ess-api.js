var essApi = angular.module('essApi');

/** --- Pay Period API --- */

essApi.factory('PayPeriodApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/periods/:periodType');
}]);

/** --- Holiday API --- */

essApi.factory('HolidayApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/holidays');
}]);

/** --- Time Record API --- */

essApi.factory('TimeRecordApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords');  
}]);

essApi.factory('TimeRecordReviewApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords/review');
}]);

essApi.factory('ActiveTimeRecordsApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords/active');
}]);

essApi.factory('ActiveYearsTimeRecordsApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords/activeYears');
}]);

essApi.factory('SupervisorTimeRecordsApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords/supervisor');
}]);

essApi.factory('SupervisorTimeRecordCountsApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords/supervisor/count');
}]);

essApi.factory('TimeRecordReminderApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords/reminder');
}]);

essApi.factory('TimeRecordCreationApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timerecords/new');
}]);

/** --- Attendance Record API --- */

essApi.factory('AttendanceRecordApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/attendance/records');
}]);

/** --- Supervisor API --- */

essApi.factory('SupervisorEmployeesApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/supervisor/employees');
}]);

essApi.factory('SupervisorChainApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/supervisor/chain');
}]);

essApi.factory('SupervisorOverridesApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/supervisor/overrides');
}]);

essApi.factory('SupervisorGrantsApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/supervisor/grants');
}]);


/** --- Accrual API --- */

essApi.factory('AccrualPeriodApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/accruals');
}]);

essApi.factory('AccrualHistoryApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/accruals/history');
}]);

/** --- Expected Hours API --- */

essApi.factory('ExpectedHoursApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/expectedhrs');
}]);

/** --- Employee API --- */

essApi.factory('EmpInfoApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/employees.json');
}]);

essApi.factory('EmpActiveYearsApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/employees/activeDates');
}]);

essApi.factory('EmpActiveYearsApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/employees/activeYears');
}]);

essApi.factory('ActiveEmployeeApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/employees/active');
}]);

essApi.factory('EmployeeSearchApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/employees/search');
}]);

/** --- Alert Info API --- */

essApi.factory('AlertInfoApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/alert-info');
}]);

/** --- Transaction API --- */

essApi.factory('EmpTransactionsApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/empTransactions/')
}]);

essApi.factory('EmpTransactionSnapshotApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/empTransactions/snapshot')
}]);

essApi.factory('EmpTransactionCurrentSnapshotApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/empTransactions/snapshot/current')
}]);

essApi.factory('EmpTransactionTimelineApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/empTransactions/timeline')
}]);

/** --- Allowance API --- */

essApi.factory('AllowanceApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/allowances');
}]);

/** --- Misc Leave Type Grant API --- */

essApi.factory('MiscLeaveGrantApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/miscleave/grants')
}]);

/** --- Paycheck History API --- */

essApi.factory('EmpCheckHistoryApi',  ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/paychecks.json')
}]);

/** --- Location API --- */

essApi.factory('LocationApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/locations.json')
}]);

/** --- Supply Destination Api --- */

essApi.factory('SupplyDestinationApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/destinations/:empId.json', {empId: '@empId'})
}]);

/** --- Supply Requisition Api --- */

essApi.factory('SupplyRequisitionApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/requisitions.json')
}]);

essApi.factory('SupplyRequisitionByIdApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/requisitions/:id.json', {id: '@id'})
}]);

essApi.factory('SupplyRequisitionProcessApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/requisitions/:id/process.json', {id: '@id'})
}]);

essApi.factory('SupplyRequisitionRejectApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/requisitions/:id/reject.json', {id: '@id'})
}]);


essApi.factory('SupplyRequisitionHistoryApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/requisitions/history/:id.json', {id: '@id'})
}]);

essApi.factory('SupplyRequisitionOrderHistoryApi', ['$resource', 'appProps', function($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/requisitions/orderHistory.json')
}]);

/** --- Supply Employees API --- */

essApi.factory('SupplyEmployeesApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/employees')
}]);

essApi.factory('SupplyIssuersApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/employees/issuers.json')
}]);

/** --- Supply Statistics API --- */

essApi.factory('SupplyLocationStatisticsApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/supply/statistics/locations.json')
}]);

/** --- Travel API --- */

essApi.factory('TravelApplicationApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/travel/travel-application.json')
}]);

essApi.factory('TravelActiveApplicationApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/travel/travel-application/active')
}]);

/** --- Timeout API --- */

essApi.factory('TimeoutApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/timeout/ping.json')
}]);

/** --- Error Report API --- */

essApi.factory('ErrorReportApi', ['$resource', 'appProps', function ($resource, appProps) {
    return $resource(appProps.apiPath + '/report/error.json')
}]);
