(function() {
	'use strict';
		angular.module('FamilyDashBoard')
	       .controller('FamilyDashBoardCtrl', function($scope, $http, $location, $timeout) {

          $scope.accountSubmitted = false;
          $scope.jobSubmitted = false;


          $scope.init = function(stringifiedArray) {
            var info = JSON.parse(stringifiedArray);
            console.log(info)
            $http
              .get('/api/family/' + info)
              .then(function(response) {
                console.log(response);
                $scope.user = response.data;
                $scope.family = response.data;
                
              });
            $http
              .get('/api/caregivers/')
              .then(function(response) {
                $scope.activeCg = _.where(response.data, {cgActive: true});
                console.log($scope.activeCg);
              });
          }

          $scope.updateAccount = function() {
            $scope.accountSubmitted = true;
            
            var updatedCareGiver = {
              fName: $scope.user.fName,
              lName: $scope.user.lName,
              email: $scope.user.email,
              phone: $scope.user.phone
              
            };
            $http
              .post('/api/family/' + $scope.user._id, updatedCareGiver)
              .then(function(response) {
                if( response ) {
                  $scope.user = response.data;
                  $location.path('/profile');
                  $scope.accountSubmitted = false;
                }          
           
              });
          }

          $scope.addActivity = function(newActivity) {
            if( newActivity == "" ) return;
              
            $scope.user.family.dailyActivities.push(newActivity);
            $scope.user.family.newActivity = "";
          }

          $scope.removeActivity = function(index) {
            $scope.user.family.dailyActivities.splice(index, 1);
          }

          $scope.saveJob = function() {
            $scope.jobSubmitted = false;
            
            var updatedCareGiver = {
              family: {
                active: true,
                patient: $scope.user.family.patient,
                contactOfPatient: $scope.user.family.contactOfPatient,
                locationOfPatient: $scope.user.family.locationOfPatient,
                dailyActivities: $scope.user.family.dailyActivities,
                startDate: $scope.user.family.startDate,
                timesOfDayCare: $scope.user.family.timesOfDayCare,
                daysOfCare: $scope.user.family.daysOfCare,
                hoursPerWeekCare: $scope.user.family.hoursPerWeekCare,
                preferGender: $scope.user.family.preferGender,
                preferCareType: $scope.user.family.preferCareType
              }
            };

            $http
              .post('/api/family/' + $scope.user._id, updatedCareGiver)
              .then(function(response) {
                  if(response) {
                    $scope.user = response.data;
                    $location.path('/profile');
                    $scope.jobSubmitted = true;
                  }
          
              });
          }

          $scope.editJob = function() {
            $scope.jobSubmitted = true;
            
            var updatedCareGiver = {
              family: {
                active: $scope.user.family.active,
                patient: $scope.user.family.patient,
                contactOfPatient: $scope.user.family.contactOfPatient,
                locationOfPatient: $scope.user.family.locationOfPatient,
                dailyActivities: $scope.user.family.dailyActivities,
                startDate: $scope.user.family.startDate,
                timesOfDayCare: $scope.user.family.timesOfDayCare,
                daysOfCare: $scope.user.family.daysOfCare,
                hoursPerWeekCare: $scope.user.family.hoursPerWeekCare,
                preferGender: $scope.user.family.preferGender,
                preferCareType: $scope.user.family.preferCareType
              }
            };
            $http
              .post('/api/family/' + $scope.user._id, updatedCareGiver)
              .then(function(response) {
                if( response ) {
                  $scope.user = response.data;
                  $location.path('/profile');
                  $scope.jobSubmitted = false;
                  
                }
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
            $scope.careGiverId = $stateParams.id;
            
            $scope.sendMessage = function() {
              $scope.messageSubmitted = true;
              
              var message = {
                fromId: $scope.$parent.user._id,
                fromFName: $scope.$parent.user.fName,
                fromLName: $scope.$parent.user.lName,
                to: $stateParams.id,
                message: $scope.message
              };
              $http
                .post('/api/caregiver/message/' + $stateParams.id, message)
                .then(function(response) {
                  if( response ) {
                    $scope.messageSubmitted = false;
                    $location.path('/profile');
                    
                  }
                });
              
            }
        }])
	
}());