'use strict';

angular.module('myApp')

.factory('WeeklistService', ['$http', function($http) {
    return {
        list: function() {
            return $http({
                method: 'GET',
                url: '/api/plans'
            });
        }
    }
}]);