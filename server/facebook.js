'use strict';

var UserModel = require('./Users'),
    config = require('./config'),
    FacebookStrategy = require('passport-facebook').Strategy;



module.exports = new FacebookStrategy({
    clientID: '498722340306033',
    clientSecret: '9040d47b97514ee32411420d4a65e7af',
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback",
    profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender'], 
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    process.nextTick(function() {
      UserModel.findOne({ 'id': profile.id}, function(err, user) {
        if(err){
          return done(err);
        }
        if(user) {
           return done(null, profile);
        } else {
          var newCareGiver = new UserModel({
            position: 'caregiver',
            email: profile._json.email,
            fName: profile._json.first_name,
            lName: profile._json.last_name,
            profile_img: profile._json.picture.data.url
          });

          newCareGiver.save(function(err) {
            if(err){
              throw err;
            }

             return done(null, newCareGiver);
          });
        }
     });
   });
  });