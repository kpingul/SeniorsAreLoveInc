(function() {
	'use strict';
      angular.module('CGDashBoard', ['ui.router',  'file-model'])
        .run(['$rootScope', '$templateCache', function ($rootScope, $templateCache) {
          $rootScope.$on('$stateChangeSuccess',function(){
            $("html, body").animate({ scrollTop: 0 }, 0);
          });
          $rootScope.$on('$stateChangeStart', function() {
            $(".loading").css('display', 'block');
          });
          $rootScope.$on('$stateChangeSuccess', function() {
            $(".loading").css('display', 'none');
          });

          // $templateCache.put('caregiver.profile.about.tpl.html');
          // $templateCache.put('caregiver.profile.experience.tpl.html');
          // $templateCache.put('caregiver.profile.information.tpl.html');
          // $templateCache.put('caregiver.profile.photo.tpl.html');
          // $templateCache.put('caregiver.profile.services.tpl.html');
          // $templateCache.put('caregiver.profile.settings.tpl.html');
          // $templateCache.put('caregiver.profile.tpl.html');
          // $templateCache.put('caregiverJobProfile.tpl.html');
          // $templateCache.put('caregiverJobs.tpl.html');
          // $templateCache.put('inbox.tpl.html');
          // $templateCache.put('messageJob.tpl.html');
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