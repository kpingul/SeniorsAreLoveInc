(function() {
	'use strict';
	 angular.module('CGDashBoard')
     .controller('CGDashBoardCtrl', ['$scope', '$location','APIService', function($scope, $location, APIService) {
        //$scope.user reflects the data model
        //from the datbase and has two-way binding
        //with the templates within CGDashBaord
        $scope.workExp2 = false;
        
        //varibles that allow for the loading
        //indicator to toggle when user submits forms
        $scope.informationSubmitted = false;
        $scope.aboutSubmitted = false;
        $scope.expSubmitted = false;
        $scope.skillsExpSubmitted = false;
        $scope.accountSubmitted = false;
        $scope.photoSubmitted = false;

        /*
          @params
          stringiified array contains the
          data stringified from the server
        */
        $scope.init = function(stringifiedArray) {
          //API call to get the authenticated
          //users information 
          APIService
            .getCareGiver(JSON.parse(stringifiedArray))
            .then(function(response) {
              $scope.user = response;

            });
          APIService
            .getMessages()
            .then(function(response) {
              $scope.messages = response;
            });
          APIService
            .getCareGiverJobs()
            .then(function(response) {
              $scope.activeJobs = response;
            });
        }

        /*
          @params
          gender contains the value of the users
          choice of gender in the profle information template
        */
        $scope.updateInformation = function(gender) {
          $scope.informationSubmitted = true;
          //stores the users update 
          //information to an object
          //to query to the API
      
          APIService
            .updateInformation($scope.user._id, $scope.user.cgActive, gender, $scope.user.contact.address, $scope.user.contact.city, $scope.user.contact.zipCode)
            .then(function(response) {
              if( response ) {
                $scope.informationSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');                
              }
            });
        };

        $scope.updateAbout = function() {
          $scope.aboutSubmitted = true;
          var updatedCareGiver = {
            about: $scope.user.about
          };
          APIService
            .updateCareGiver($scope.user._id, updatedCareGiver)
            .then(function(response) {
              if( response ) {
                $scope.aboutSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
                
              }
            });
        };

        $scope.updateExperience = function() {
          $scope.expSubmitted = true;
          var updatedCareGiver = {
            yrsExp: $scope.user.yrsExp,
            title: $scope.user.profExp.title,
            employer: $scope.user.profExp.employer,
            start: $scope.user.profExp.start,
            end: $scope.user.profExp.end,
            desc: $scope.user.profExp.desc
          };

          APIService
            .updateCareGiver($scope.user._id, updatedCareGiver)
            .then(function(response) {
              if( response ) {
                $scope.expSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
              }
            });
        };

        $scope.updateAllExperience = function() {
            $scope.expSubmitted = true;
           var updatedCareGiver = {
            yrsExp: $scope.user.yrsExp,
            workExp: $scope.user.workExp
          };
          APIService
            .updateCareGiver($scope.user._id, updatedCareGiver)
            .then(function(response) {
              if( response ) {
                $scope.expSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
              }
            });
        };

        $scope.updateAccount = function() {
          $scope.accountSubmitted = true;
          
          var updatedCareGiver = {
            fName: $scope.user.fName,
            lName: $scope.user.lName,
            email: $scope.user.email,
            phone: $scope.user.phone
            
          };
          APIService
            .updateCareGiver($scope.user._id, updatedCareGiver)
            .then(function(response) {
              if( response ) {
                $scope.accountSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
              }
            });
        }

        $scope.updateSkillsExp = function() {
          $scope.skillsExpSubmitted = true;
          
          var updatedCareGiver = {
            hourRate: $scope.user.hourRate,
            careType: $scope.user.careType,
            skills: $scope.user.skills
          };

          APIService
            .updateCareGiverServices($scope.user._id, updatedCareGiver)
            .then(function(response) {
              if( response ) {
                $scope.skillsExpSubmitted = false;
                $scope.user = response.data;
                $location.path('/profile');
              }
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

 
      
	
}());