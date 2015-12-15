'use strict';

var express = require('express'),
		passport = require('passport');

module.exports = (function() {
	var router = express.Router(),
			routerService = {};

	routerService.index = router.get('', function(req, res) {
		res.render('./../views/index.ejs');
	});
	routerService.login = router.get('/login', function(req, res) {
		res.render('./../views/login.ejs', { message: req.flash('loginMessage') });
	});
	routerService.loginUser = router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
	  	function(req, res) {
	  		if( req.user.position == 'caregiver' ) {
	  			res.redirect('/caregiver/dashboard/');
	  		} else if ( req.user.position == 'family' ) {
	  			res.redirect('/family/dashboard/');
	  		}	  				
	 });

	return routerService;
}());



