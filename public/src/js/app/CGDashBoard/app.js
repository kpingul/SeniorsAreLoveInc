(function() {
	'use strict';
      angular.module('CGDashBoard', ['ui.router'])
        .run(['$rootScope', function ($rootScope) {
          $rootScope.$on('$stateChangeSuccess',function(){
            $("html, body").animate({ scrollTop: 0 }, 0);
          });
        }])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.when('', '/profile')

            $stateProvider
              .state('careGiverProfile', {
                url: '/profile',
                templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.tpl.html',
                controller: 'CGDashBoardCtrl'
              })    
                .state('inbox', {
                  url :'/inbox',
                  templateUrl: "/public/src/js/app/CGDashBoard/templates/inbox.tpl.html",
                })
                .state('careGiverViewProfile', {
                  url: '/viewProfile',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.view.tpl.html',
                }) 
                .state('careGiverProfileEditPhoto', {
                  url: '/profile/photo/',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.photo.tpl.html',
                })
                .state('careGiverProfileEditInformation', {
                  url: '/profile/information/',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.information.tpl.html'
                }) 
                .state('careGiverProfileEditAbout', {
                  url: '/profile/about/',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.about.tpl.html'
                }) 
                .state('careGiverProfileEditServices', {
                  url: '/profile/services/',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.services.tpl.html'
                })
                .state('careGiverProfileEditExperience', {
                  url: '/profile/experience',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.experience.tpl.html'
                })
                .state('careGiverProfileSettings', {
                  url: '/profile/settings',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiver.profile.settings.tpl.html'
                })
                .state('caregiverJobs', {
                  url: '/caregiver-jobs',
                  templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiverJobs.tpl.html'
                })  
              .state('caregiverJob', {
                url: '/caregiver-job/profile/:id',
                templateUrl: '/public/src/js/app/CGDashBoard/templates/caregiverJobProfile.tpl.html',
                controller: 'CaregiverJobProfile'
              })
              .state('messageJob', {
                url: '/caregiver-job/message/:id',
                templateUrl: '/public/src/js/app/CGDashBoard/templates/messageJob.tpl.html',
                controller: 'MessageJob'
              })
        }])

}());