(function() {
	'use strict';
		angular.module('CGDashBoard')
			.controller('CaregiverJobProfile', ['$scope','APIService', '$stateParams', function ($scope, APIService, $stateParams) {
        APIService
          .getJobProfile($stateParams.id)
          .then(function(response) {
            $scope.caregiverJob = response;
          });
    	}])
	
}());