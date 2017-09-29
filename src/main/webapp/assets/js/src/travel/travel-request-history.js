var essTravel = angular.module('essTravel');

//essTravel.controller('TravelHistoryController', ['$scope', 'TravelApplicationApi', historyController]);
essTravel.controller('TravelHistoryController', ['$scope', 'PaginationModel', historyController]);

function historyController($scope, paginationModel) {
    $scope.paginate = angular.extend({}, paginationModel);
    $scope.empId = 11168;
    //$scope.empId = appProps.user.employeeId;
    $scope.status = 'APPROVED';

    $scope.test = "Hello angular";

    $scope.data = {
        "success": true,
        "message": "",
        "responseType": "travel-application list",
        "total": 10,
        "offsetStart": 1,
        "offsetEnd": 10,
        "limit": 10,
        "result": [
            {
                "id": 11,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "8.75",
                    "lodging": "319.89",
                    "incidental": "7.77",
                    "total": "336.41"
                },
                "transportationAllowance": {
                    "mileage": "57.91",
                    "tolls": "1.42",
                    "total": "59.33"
                },
                "totalAllowance": "395.74",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-12-18T15:22:54.998",
                            "departureDateTime": "2017-12-19T15:22:54.998",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-12-18",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.998",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.998"
            },
            {
                "id": 12,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "4.15",
                    "lodging": "23.02",
                    "incidental": "11.27",
                    "total": "38.44"
                },
                "transportationAllowance": {
                    "mileage": "114.70",
                    "tolls": "13.23",
                    "total": "127.93"
                },
                "totalAllowance": "166.37",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-10-31T15:22:54.998",
                            "departureDateTime": "2017-11-01T15:22:54.998",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-10-31",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.998",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.998"
            },
            {
                "id": 13,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "8.99",
                    "lodging": "275.60",
                    "incidental": "9.86",
                    "total": "294.45"
                },
                "transportationAllowance": {
                    "mileage": "27.82",
                    "tolls": "24.54",
                    "total": "52.36"
                },
                "totalAllowance": "346.81",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-12-18T15:22:54.998",
                            "departureDateTime": "2017-12-21T15:22:54.998",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-12-18",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.998",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.998"
            },
            {
                "id": 14,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "22.73",
                    "lodging": "97.66",
                    "incidental": "5.53",
                    "total": "125.92"
                },
                "transportationAllowance": {
                    "mileage": "134.93",
                    "tolls": "34.63",
                    "total": "169.56"
                },
                "totalAllowance": "295.48",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-11-14T15:22:54.998",
                            "departureDateTime": "2017-11-16T15:22:54.998",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-11-14",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.998",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.998"
            },
            {
                "id": 15,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "4.24",
                    "lodging": "268.56",
                    "incidental": "9.18",
                    "total": "281.98"
                },
                "transportationAllowance": {
                    "mileage": "55.13",
                    "tolls": "37.15",
                    "total": "92.28"
                },
                "totalAllowance": "374.26",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-10-09T15:22:54.998",
                            "departureDateTime": "2017-10-11T15:22:54.998",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-10-09",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.998",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.998"
            },
            {
                "id": 16,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "8.66",
                    "lodging": "29.84",
                    "incidental": "5.35",
                    "total": "43.85"
                },
                "transportationAllowance": {
                    "mileage": "45.05",
                    "tolls": "30.45",
                    "total": "75.50"
                },
                "totalAllowance": "119.35",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-11-10T15:22:54.999",
                            "departureDateTime": "2017-11-14T15:22:54.999",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-11-10",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.999",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.999"
            },
            {
                "id": 17,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "24.10",
                    "lodging": "24.77",
                    "incidental": "8.41",
                    "total": "57.28"
                },
                "transportationAllowance": {
                    "mileage": "70.46",
                    "tolls": "5.92",
                    "total": "76.38"
                },
                "totalAllowance": "133.66",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-12-31T15:22:54.999",
                            "departureDateTime": "2018-01-02T15:22:54.999",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-12-31",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.999",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.999"
            },
            {
                "id": 18,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "10.26",
                    "lodging": "271.76",
                    "incidental": "3.62",
                    "total": "285.64"
                },
                "transportationAllowance": {
                    "mileage": "11.90",
                    "tolls": "28.85",
                    "total": "40.75"
                },
                "totalAllowance": "326.39",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-12-27T15:22:54.999",
                            "departureDateTime": "2017-12-28T15:22:54.999",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-12-27",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.999",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.999"
            },
            {
                "id": 19,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "13.89",
                    "lodging": "198.62",
                    "incidental": "7.99",
                    "total": "220.50"
                },
                "transportationAllowance": {
                    "mileage": "22.11",
                    "tolls": "12.43",
                    "total": "34.54"
                },
                "totalAllowance": "255.04",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2017-10-06T15:22:54.999",
                            "departureDateTime": "2017-10-07T15:22:54.999",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2017-10-06",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.999",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.999"
            },
            {
                "id": 20,
                "applicant": {
                    "employeeId": 11168,
                    "uid": "caseiras",
                    "firstName": "Kevin",
                    "lastName": "Caseiras",
                    "fullName": "Kevin F. Caseiras",
                    "email": "caseiras@nysenate.gov",
                    "active": true,
                    "title": "Mr.",
                    "initial": "F.",
                    "suffix": null,
                    "workPhone": "(518) 455-7989",
                    "homePhone": "(518) 496-2293",
                    "gender": "M"
                },
                "modeOfTransportation": "PERSONAL_AUTO",
                "gsaAllowance": {
                    "meals": "6.89",
                    "lodging": "280.57",
                    "incidental": "5.96",
                    "total": "293.42"
                },
                "transportationAllowance": {
                    "mileage": "46.86",
                    "tolls": "35.25",
                    "total": "82.11"
                },
                "totalAllowance": "375.53",
                "itinerary": {
                    "origin": {
                        "addr1": "88 Central Ave",
                        "addr2": "",
                        "city": "Albany",
                        "state": "NY",
                        "zip5": "12222",
                        "zip4": ""
                    },
                    "destinations": [
                        {
                            "arrivalDateTime": "2018-01-01T15:22:54.999",
                            "departureDateTime": "2018-01-03T15:22:54.999",
                            "address": {
                                "addr1": "100 Washington Ave",
                                "addr2": "",
                                "city": "Albany",
                                "state": "NY",
                                "zip5": "12222",
                                "zip4": ""
                            }
                        }
                    ]
                },
                "status": "APPROVED",
                "travelDate": "2018-01-01",
                "createdBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "createdDateTime": "2017-09-28T15:22:54.999",
                "modifiedBy": {
                    "employeeId": 0,
                    "uid": null,
                    "firstName": null,
                    "lastName": null,
                    "fullName": null,
                    "email": null,
                    "active": false,
                    "title": null,
                    "initial": null,
                    "suffix": null,
                    "workPhone": null,
                    "homePhone": null,
                    "gender": null
                },
                "modifiedDateTime": "2017-09-28T15:22:54.999"
            }
        ]
    };
    $scope.travelHistory = JSON.parse($scope.data);

    $scope.init = function () {
        $scope.paginate.itemsPerPage = 12;
    };

    /** Updates the displayed requisitions whenever the page is changed. */
    $scope.onPageChange = function () {
        $scope.loading = true;
        //get travel history information
    };
}

/* function historyController($scope, travelApplicationApi) {
    $scope.empId = 11168;
    //$scope.empId = appProps.user.employeeId;
    $scope.status = 'APPROVED';

    function getTravelHistory () {
        var params = {
            empId: $scope.empId,
            status: $scope.status
        };
        return travelApplicationApi.get(params, onSuccess, onFail);

        function onSuccess (resp) {
            $scope.travelHistory = JSON.parse(resp);
        }
        function onFail (resp) {
            modals.open('500', {details: resp});
            console.error(resp);
        }
    }

    getTravelHistory();

    $scope.test = "Hello angular"
} */