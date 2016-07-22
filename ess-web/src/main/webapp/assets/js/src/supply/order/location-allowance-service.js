angular.module('essSupply').service('SupplyLocationAllowanceService',
    ['SupplyLocationAllowanceApi', 'SupplyUtils', locationAllowanceService]);

function locationAllowanceService(allowanceApi, supplyUtils) {

    var allowances = undefined;

    function filterAllowancesByCategories(allowances, categories) {
        if (categories.length === 0) {
            return allowances;
        }
        var filtered = [];
        angular.forEach(allowances, function (allowance) {
            if (categories.indexOf(allowance.item.category.name) !== -1) {
                filtered.push(allowance);
            }
        });
        return filtered;
    }

    function filterAllowancesBySearch(allowances, searchTerm) {
        var filtered = [];
        angular.forEach(allowances, function (allowance) {
            if (allowance.item.description.indexOf(searchTerm.toUpperCase()) !== -1) {
                filtered.push(allowance);
            }
        });
        return filtered
    }

    return {
        queryLocationAllowance: function (location) {
            return allowanceApi.get({id: location.locId}, function (response) {
                allowances = supplyUtils.alphabetizeAllowances(response.result.itemAllowances);
            }).$promise;
        },

        /** Returns allowances belonging to one of the given categories and a description containing the searchTerm. */
        getFilteredAllowances: function (categories, searchTerm) {
            return filterAllowancesBySearch(filterAllowancesByCategories(angular.copy(allowances), categories), searchTerm);
        },

        getAllowances: function () {
            return angular.copy(allowances);
        },

        getAllowanceByItemId: function (itemId) {
            for (var i = 0; i < allowances.length; i++) {
                if (allowances[i].item.id === itemId) {
                    return allowances[i];
                }
            }
        },

        /**
         * Returns an array with integers from 1 to the per order allowance for an allowance.
         */
        getAllowedQuantities: function (allowance) {
            // Some items have an per order allowance of 99999, this is too much, cap it at 50.
            if (allowance.perOrderAllowance > 50) {
                allowance.perOrderAllowance = 50;
            }
            var range = [];
            for (var i = 1; i <= allowance.perOrderAllowance; i++) {
                range.push(i);
            }
            return range;
        }
    }
}