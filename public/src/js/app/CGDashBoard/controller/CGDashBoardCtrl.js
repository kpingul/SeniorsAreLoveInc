(function() {
	'use strict';
	 angular.module('CGDashBoard')
     .controller('CGDashBoardCtrl', ['$scope', '$http', '$timeout', '$location', function($scope, $http, $timeout, $location) {
        //$scope.user reflects the data model
        //from the datbase and has two-way binding
        //with the templates within CGDashBaord
        
        //varibles that allow for the loading
        //indicator to toggle when user submits forms
        $scope.informationSubmitted = false;
        $scope.aboutSubmitted = false;
        $scope.expSubmitted = false;
        $scope.skillsExpSubmitted = false;
        $scope.accountSubmitted = false;

        /*
          @params
          stringiified array contains the
          data stringified from the server
        */
        $scope.init = function(stringifiedArray) {
          //Parsing the users data from the server 
          var info = JSON.parse(stringifiedArray);

          //API call to get the authenticated
          //users information 
          $http
            .get('/api/caregiver/' + info)
            .then(function(response) {
              $scope.user = response.data;

              console.log($scope.user);
            });
          $http
            .get('/api/caregiverJobs')
            .then(function(response) {
              $scope.caregiverJobs = response.data;
              console.log($scope.caregiverJobs);
            });
        }

        /*
          @params
          gender contains the value of the users
          choice of gender in the profle information template
        */
        $scope.updateInformation = function(gender) {
          //stores the users update 
          //information to an object
          //to query to the API
          var updatedCareGiver = {
            gender: gender,
            contact: {
              address: $scope.user.contact.address,
              city: $scope.user.contact.city,
              zipCode: $scope.user.contact.zipCode
            }

          };
          $http
            .post('/api/caregiver/' + $scope.user._id, updatedCareGiver)
            .then(function(response) {
              //when the response comes back
              //the loading indicator toggles to true
              $scope.informationSubmitted = true;
              $timeout(function() {
                //when timeout executes the function
                //the user data is updated and redirected
                //to the profile section to view the udpated data
                $scope.informationSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
                //fires the digest cycle to 
                //update the data in the main profile
                $scope.$apply();
              }, 300);
            });
          console.log(updatedCareGiver);
        };

        $scope.updateAbout = function() {
          var updatedCareGiver = {
            about: $scope.user.about
          };
          $http
            .post('/api/caregiver/' + $scope.user._id, updatedCareGiver)
            .then(function(response) {
              $scope.aboutSubmitted = true;
              $timeout(function() {
                $scope.aboutSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
                $scope.$apply();
              }, 300);
            });
        };

        $scope.updateExperience = function() {
          var updatedCareGiver = {
            yrsExp: $scope.user.yrsExp,
            title: $scope.user.profExp.title,
            employer: $scope.user.profExp.employer,
            start: $scope.user.profExp.start,
            end: $scope.user.profExp.end,
            desc: $scope.user.profExp.desc
          };

          $http
            .post('/api/caregiver/experience/' + $scope.user._id, updatedCareGiver)
            .then(function(response) {
              $scope.expSubmitted = true;
              $timeout(function() {
                $scope.expSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
                $scope.$apply();
              }, 300);
            });
        };

        $scope.updateAccount = function() {
          var updatedCareGiver = {
            fName: $scope.user.fName,
            lName: $scope.user.lName,
            email: $scope.user.email,
            phone: $scope.user.phone
            
          };
          $http
            .post('/api/caregiver/' + $scope.user._id, updatedCareGiver)
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

        $scope.updateSkillsExp = function() {
          var updatedCareGiver = {
            hourRate: $scope.user.hourRate,
            careType: $scope.user.careType,
            skills: $scope.user.skills
          };

          $http
            .post('/api/caregiver/services/' + $scope.user._id, updatedCareGiver)
            .then(function(response) {
              $scope.skillsExpSubmitted = true;
              $timeout(function() {
                $scope.skillsExpSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
                $scope.$apply();
              }, 300);
            });


        }

        /*
          @params
          newSkill contains the data passed from the template
          to update the current list of skills in their profile

        */
        $scope.addSkill = function(newSkill) {
          if( newSkill == "" )
            return;

          $scope.user.skills.push(newSkill);
          $scope.user.newSkill = "";
        }

        /*
          @params
          index contains the current index of the skill
          to be deleted from the list 
        */
        $scope.removeSkill = function(index) {
          
          $scope.user.skills.splice(index, 1);
        }

    }])
    .controller('CaregiverJobProfile', ['$scope','$http', '$stateParams', function ($scope, $http, $stateParams) {

        $http
          .get('/api/family/' + $stateParams.id)
          .then(function(response) {
            $scope.caregiverJob = response.data;
          });
    }])
    .controller('MessageJob', ['$scope','$http','$stateParams', '$timeout','$location', function ($scope,$http, $stateParams,$timeout, $location) {
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
          .post('/api/caregiverjob/message/' + $stateParams.id, message)
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