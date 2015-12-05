(function() {
	'use strict';
		angular.module('FamilyDashBoard')
	       .controller('FamilyDashBoardCtrl', function($scope, $http, $location, $timeout) {

          $scope.accountSubmitted = false;
          $scope.jobSubmitted = false;


          $scope.init = function(stringifiedArray) {
            var info = JSON.parse(stringifiedArray);
            $http
              .get('/api/family/' + info)
              .then(function(response) {
                $scope.user = response.data;
                $scope.family = response.data;
                console.log($scope.user);
                
              });
            $http
              .get('/api/caregivers/')
              .then(function(response) {
                $scope.caregivers = response.data;
                console.log($scope.caregivers);
                
              });
          }

          $scope.updateAccount = function() {
            var updatedCareGiver = {
              fName: $scope.user.fName,
              lName: $scope.user.lName,
              email: $scope.user.email,
              phone: $scope.user.phone
              
            };
            $http
              .post('/api/family/' + $scope.user._id, updatedCareGiver)
              .then(function(response) {
                $scope.accountSubmitted = true;
                $timeout(function() {
                  $scope.accountSubmitted = false;
                  $scope.user = response.data;
                  $location.path('/profile');
                  $scope.$apply();
                }, 300);
              });
          }

          $scope.addActivity = function(newActivity) {
            if( $scope.user.newActivity = "" ) 
              return;

            $scope.user.dailyActivities.push(newActivity);
            $scope.user.newActivity = "";
          }

          $scope.removeActivity = function(index) {
            $scope.user.dailyActivities.splice(index, 1);
          }

          $scope.saveJob = function() {
            var updatedCareGiver = {
              patient: $scope.user.patient,
              contactOfPatient: $scope.user.contactOfPatient,
              locationOfPatient: $scope.user.locationOfPatient,
              dailyActivities: $scope.user.dailyActivities,
              startDate: $scope.user.startDate,
              timesOfDayCare: $scope.user.timesOfDayCare,
              daysOfCare: $scope.user.daysOfCare,
              hoursPerWeekCare: $scope.user.hoursPerWeekCare,
              preferGender: $scope.user.preferGender,
              preferCareType: $scope.user.preferCareType
            };
            $http
              .post('/api/family/' + $scope.user._id, updatedCareGiver)
              .then(function(response) {
                $scope.jobSubmitted = true;
                $timeout(function() {
                  $scope.jobSubmitted = false;
                  $scope.user = response.data;
                  $location.path('/profile');
                  $scope.$apply();
                }, 300);
              });
          }

          $scope.editJob = function() {
            var updatedCareGiver = {
              patient: $scope.user.patient,
              contactOfPatient: $scope.user.contactOfPatient,
              locationOfPatient: $scope.user.locationOfPatient,
              dailyActivities: $scope.user.dailyActivities,
              startDate: $scope.user.startDate,
              timesOfDayCare: $scope.user.timesOfDayCare,
              daysOfCare: $scope.user.daysOfCare,
              hoursPerWeekCare: $scope.user.hoursPerWeekCare,
              preferGender: $scope.user.preferGender,
              preferCareType: $scope.user.preferCareType
            };
            $http
              .post('/api/family/' + $scope.user._id, updatedCareGiver)
              .then(function(response) {
                $scope.jobSubmitted = true;
                $timeout(function() {
                  $scope.jobSubmitted = false;
                  $scope.user = response.data;
                  $location.path('/profile');
                  $scope.$apply();
                }, 300);
              });
          }
        })
        .controller('CargiverCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
          $http
            .get('/api/caregiver/' + $stateParams.id)
            .then(function(response) {
              $scope.caregiver = response.data;
            });

          
        }])
        .controller('MessageCareGiver', ['$scope','$stateParams','$location','$timeout','$http', function ($scope, $stateParams,$location, $timeout, $http) {
            $scope.messageSubmitted = false;
            $scope.jobId = $stateParams.id;
            
            $scope.sendMessage = function() {
              var message = {
                fromId: $scope.$parent.user._id,
                fromFName: $scope.$parent.user.fName,
                fromLName: $scope.$parent.user.lName,
                to: $stateParams.id,
                message: $scope.message
              };
              console.log(message);
              $http
                .post('/api/caregiver/message/' + $stateParams.id, message)
                .then(function(response) {
                    $scope.messageSubmitted = true;
                    $timeout(function() {
                      $scope.messageSubmitted = false;
                      $location.path('/profile');
                      $scope.$apply();
                    }, 300);
                });
              
            }
        }])
	
}());