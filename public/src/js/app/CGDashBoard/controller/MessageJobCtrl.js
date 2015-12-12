(function() {
	'use strict';
		angular.module('CGDashBoard')
			.controller('MessageJob', ['$scope','APIService','$stateParams', '$timeout','$location', function ($scope,APIService, $stateParams,$timeout, $location) {
	      $scope.messageSubmitted = false;
	      $scope.jobId = $stateParams.id;
	      
	      $scope.sendMessage = function() {
	        $scope.messageSubmitted = true;
	        
	        var message = {
	          fromId: $scope.$parent.user._id,
	          fromFName: $scope.$parent.user.fName,
	          fromLName: $scope.$parent.user.lName,
	          to: $stateParams.id,
	          message: $scope.message
	        };
	        APIService
	          .sendMessageToJob($stateParams.id, message)
	          .then(function(response) {
	            if( response ) {
	              $scope.messageSubmitted = false;
	              $location.path('/profile');
	            }
	          });
	        
	      }
	    }])
	
}());