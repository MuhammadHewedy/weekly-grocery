'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/view.html',
        controller: 'LoginCtrl'
    });
}])

.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'LoginService', 'AlertService', 'LoginServiceProxy', 
                          function($scope, $rootScope, $location, LoginService, AlertService, LoginServiceProxy) {

    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.login = function() {
    	CommonLoginService.login($scope.credentials);
    }

}]);