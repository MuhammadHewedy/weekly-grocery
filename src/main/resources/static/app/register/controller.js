'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/view.html',
        controller: 'RegisterCtrl'
    });
}])

.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', 'RegisterService', 'AlertService', 'LoginServiceProxy', 
                             function($scope, $rootScope, $location, RegisterService, AlertService, LoginServiceProxy) {

    $scope.userInfo = {
        username: '',
        password: ''
    };

    $scope.register = function() {
    	RegisterService.register($scope.userInfo).then(
            function() {
            	CommonLoginService.login($scope.userInfo);
            },
            function(error) {
                AlertService.error(error.data.message);
                console.log(error.data.message);
            });
    }
}]);