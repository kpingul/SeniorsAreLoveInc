'use strict';
var passport 		= require('passport'),
	UserModel   	= require('./Users'),
	facebook 			= require('./facebook'),
	local    			= require('./local');

module.exports = function() {

	passport.use(facebook);
	passport.use(local);
	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete Instagram profile is
	//   serialized and deserialized.

	// allows for perrsistent login sessions by
	// serializing and deserializing users
	// into and out of sessions

	//serializing = turn data into a stream of bytes
	//deserializing turn a steam of bytes back into a copy of the original object
	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});
	passport.deserializeUser(function(userId, done) {
	  UserModel.findOne({_id: userId}, function(err, user) {
	    if(err) {
	      done(err)
	    }
	    if(user){
	      done(null, user);
	    } else {
	      done(null, false)
	    }

	  });
	});


};