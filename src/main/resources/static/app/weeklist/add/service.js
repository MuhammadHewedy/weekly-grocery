'use strict';

angular.module('myApp')

.factory('AddWeeklistService', ['$http', function($http) {
    return {
        save: function(plan) {
            return $http({
                method: 'POST',
                url: '/api/plans',
                data: plan
            });
        }
    }
}]);