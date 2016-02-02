(function() {
  'use strict';

   angular.module('FamilyDashBoard', ['templates', 'ui.router'])
     .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess',function(){
          $("html, body").animate({ scrollTop: 0 }, 0);
        });
        $rootScope.$on('$stateChangeStart', function() {
          $(".loading").css('display', 'block');
        });
        $rootScope.$on('$stateChangeSuccess', function() {
          $(".loading").css('display', 'none');
        });

      }])
      .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.when('', '/profile');
        $stateProvider
          .state('familyProfile', {
            url :'/profile',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/family.profile.tpl.html",
            controller: 'FamilyDashBoardCtrl'
          })   
          .state('familyProfileView', {
            url :'/profile',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/family.profile.view.tpl.html",
          })
          .state('familyProfileSettings', {
            url :'/profile/settings',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/family.profile.settings.tpl.html"
          })  
          .state('familyProfileAddJob', {
            url :'/profile/addJob',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/family.profile.addJob.tpl.html"
          }) 
          .state('familyProfileEditJob', {
            url :'/profile/edit/job',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/family.profile.editJob.tpl.html"
          })
          .state('caregiverList', {
            url :'/caregiver/jobs/',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/caregiverjobs.tpl.html"
          })
          .state('caregiverProfile', {
            url :'/caregiver/profile/:id',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/caregiver.profile.tpl.html",
            controller: 'CargiverCtrl'
          })  
          .state('messageCareGiver', {
            url :'/caregiver/message/:id',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/messageCareGiver.tpl.html",
            controller: 'MessageCareGiver'
          })  
          .state('inbox', {
            url :'/inbox',
            templateUrl: "/public/src/js/app/FamilyDashBoard/templates/inbox.tpl.html"
          })


        
      }]);
  
}());