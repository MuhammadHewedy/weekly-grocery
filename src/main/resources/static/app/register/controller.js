'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/view.html',
        controller: 'RegisterCtrl'
    });
}])

.controller('RegisterCtrl', ['$scope', '$rootScope', '$location', 'RegisterService', 'AlertService', function($scope, $rootScope, $location, RegisterService, AlertService) {

    $scope.userInfo = {
        username: '',
        password: ''
    };

    $scope.register = function() {
    	RegisterService.register($scope.userInfo).then(
            function() {
//                $location.path('/login');
                AlertService.success("success.register");
            },
            function(error) {
                AlertService.error(error.data.message);
                console.log(error.data.message);
            });
    }

}]);