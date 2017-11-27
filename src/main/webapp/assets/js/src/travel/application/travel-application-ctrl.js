var essTravel = angular.module('essTravel');

essTravel.controller('NewTravelApplicationCtrl',
                     ['$scope', 'appProps', 'modals', 'TravelGsaAllowanceApi', 'TravelMileageAllowanceApi',
                      'TravelApplicationApi', travelAppController]);

function travelAppController($scope, appProps, modals, gsaApi, mileageAllowanceApi, travelApplicationApi) {

    /* --- Container Page --- */

    const STATES = ['LOCATION_SELECTION', 'METHOD_AND_PURPOSE', 'REVIEW_AND_SUBMIT'];
    $scope.state = '';
    $scope.app = {
        applicantEmpId: undefined,
        allowances: {
            gsa: {
                meals: 0,
                lodging: 0,
                incidental: 0
            },
            mileage: 0,
            tolls: 0,
            parking: 0,
            alternate: 0,
            registrationFee: 0
        },
        itinerary: {
            origin: undefined,
            destinations: {
                items: []
            }
        },
        purposeOfTravel: ''
    };

    function init() {
        $scope.state = STATES[0];
        $scope.app.applicantEmpId = appProps.user.employeeId;
    }

    init();

    /* --- Location Selection --- */

    $scope.setOrigin = function (address) {
        $scope.app.itinerary.origin = address;
    };

    $scope.addDestinationOnClick = function() {
        var params = {
            defaultModeOfTransportation: undefined
        };
        if ($scope.app.itinerary.destinations.items.length > 0) {
            params.defaultModeOfTransportation = $scope.app.itinerary.destinations.items[$scope.app.itinerary.destinations.items.length - 1].modeOfTransportation
        }
        modals.open('destination-selection-modal', params)
            .then(function (destination) {
                $scope.app.itinerary.destinations.items.push(destination);
            });
    };

    $scope.removeDestination = function(dest) {
        var index = $scope.app.itinerary.destinations.items.indexOf(dest);
        $scope.app.itinerary.destinations.items.splice(index, 1);
    };

    $scope.locationsCompleted = function() {
        return $scope.app.itinerary.origin && $scope.app.itinerary.destinations.items.length > 0;
    };

    $scope.toMethodAndPurpose = function() {
        $scope.state = STATES[1];
        console.log($scope.app);
    };

    /* --- Method and Purpose --- */

    // $scope.MODES_OF_TRANSPORTATION = ['Personal Auto', 'Senate Vehicle', 'Train', 'Airplane', 'Other'];

    $scope.methodAndPurposeCompleted = function () {
        return $scope.app.modeOfTransportation;
    };

    $scope.toReviewAndSubmit = function () {
        $scope.state = STATES[2];
        $scope.initReviewAndSubmit();
    };

    /* --- Review and Submit --- */

    $scope.initReviewAndSubmit = function () {
        console.log($scope.app.itinerary);
        gsaApi.save($scope.app.itinerary, function (response) {
            console.log(response);
            $scope.app.allowances.gsa = response.result;
        });

        mileageAllowanceApi.save($scope.app.itinerary, function (response) {
            $scope.app.allowances.mileage = response.result.mileage;
        });
    };

    $scope.submitApplication = function () {
        travelApplicationApi.save($scope.app, function () {
            console.log("Done Submitting app");
        });
    };
}
