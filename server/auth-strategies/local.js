'use strict';
var UserModel     = require('./../models/Users'),
    async        = require('async'),
    CareGiverModel = require('./../models/CareGiver.js'),
    FamilyModel = require('./../models/Family.js'),
    _          = require('underscore'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, userEmail, userPassword, done) {
    // Process tick won't execute  until the information
    // provided in the callback is available
    // process.nextTick(function() {
    //   // DB call for a specific user based on the email
    //   UserModel
    //   .findOne({ email: userEmail})
    //   .select('+password')
    //   .exec(function(err, user) {
    //      if(err) {
    //       return done(err);
    //     }
    //     if(!user) {
    //       console.log('email is invalid');
    //       return done(null, false,  req.flash('loginMessage', 'Email is invalid, please try again'));
    //     }
    //     if(!user.validPassword(userPassword)) {
    //       console.log('password is invalid');
    //       return done(null, false, req.flash('loginMessage', 'Password is invalid please try again'))
    //     }
    //     if(user && user.validPassword(userPassword)) {
    //       console.log('valid email and password');
    //       return done(null, user);
    //     }       
    //   });
    // });

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
