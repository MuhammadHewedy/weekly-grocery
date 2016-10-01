'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/weeklist/add', {
        templateUrl: 'weeklist/add/view.html',
        controller: 'AddWeeklistCtrl'
    });
}])

.controller('AddWeeklistCtrl', ['$scope', '$rootScope', '$location', 'AddWeeklistService', 'AlertService',
                             function($scope, $rootScope, $location, AddWeeklistService, AlertService) {

    $scope.list = [{}];
    
    $scope.addNew = function(){
    	//TODO save the list in the browser
    	$scope.list.push({});
    	console.log($scope.list);
    }
    
    $scope.remove = function(index){
    	$scope.list.splice(index, 1);
    }
    
    $scope.save = function(){
    	AddWeeklistService.save({
    		weekNo: $scope.weekNo(),
    		items: $scope.list
    	}).then(function(){
    		$location.path('/weeklist');
    		AlertService.success();
    	}, function(){
    		AlertService.error();
    	});
    }
    
    $scope.weekNo = function (){
        var d = new Date();
        d.setHours(0,0,0);
        d.setDate(d.getDate()+4-(d.getDay()||7));
        return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
    };
}]);