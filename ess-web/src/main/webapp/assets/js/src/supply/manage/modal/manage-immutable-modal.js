var essSupply = angular.module('essSupply');

essSupply.directive('manageImmutableModal', ['appProps', 'modals', 'LocationService', 'SupplyAcceptShipmentsApi',
    function (appProps, modals, locationService, acceptShipmentsApi) {
    return {
        templateUrl: appProps.ctxPath + '/template/supply/manage/modal/immutable-modal',
        link: link
    };

    function link($scope, $elem, $attrs) {
        $scope.shipment = modals.params();
        
        $scope.acceptShipment = function() {
            acceptShipmentsApi.save({id: $scope.shipment.id}, null,
            function(value, responseHeaders) {
                $scope.close();
                reload();
            },
            function(errorResponse) {
                console.log("An error occurred: " + errorResponse);
            })
        };

        $scope.close = function() {
            modals.resolve();
        };

        function reload() {
            locationService.go("/supply/manage/manage", true);
        }
    }
}]);