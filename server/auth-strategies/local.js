'use strict';
var async           = require('async'),
    CareGiverModel  = require('./../models/CareGiver.js'),
    FamilyModel     = require('./../models/Family.js'),
    _               = require('underscore'),
    LocalStrategy   = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, userEmail, userPassword, done) {

    async.parallel([
      function(callback) {
        CareGiverModel
          .findOne({ email: userEmail})
          .select('+password')
          .exec(function(err, user) {
            if(err)
              console.log(err);
            if(!user)
              callback(null, 'no caregiver user');
            if(user)
              callback(null, user);
          });
      },  
      function(callback) {
        FamilyModel
          .findOne({ email: userEmail})
          .select('+password')
          .exec(function(err, user) {
            if(err)
              console.log(err);
            if(!user)
              callback(null, 'no family user');
            if(user)
              callback(null, user);
          });
      },

    ], function (err, results) {
      var userData =  _.findWhere(results, {email: userEmail}); 
      if(err)
        console.log(err);
      if( userData == undefined ) {
        return done(null, false,  req.flash('loginMessage', 'Email is invalid, please try again'));
      }
      if( !userData.validPassword(userPassword)) {
         return done(null, false, req.flash('loginMessage', 'Password is invalid please try again'))
      }
      if(userData && userData.validPassword(userPassword)) {
        console.log('valid email and password');
        return done(null, userData);
      }     

      
    });

  });
