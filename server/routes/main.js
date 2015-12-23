'use strict';

var express 		= require('express'),
		config 			= require('./../config'),
    cloudinary 	= require('./../models/Cloudinary'),
    multer     	= require('multer'),
    upload 		 	= multer({dest: './uploads/'}),
		passport 		= require('passport');

module.exports = (function() {
	
	var router = express.Router(),
			routerService = {};

	routerService.index = router.get('', function(req, res) {
		res.render('./../views/index.ejs');
	});
	routerService.login = router.get('/login', function(req, res) {
		res.render('./../views/login.ejs', { message: req.flash('loginMessage') });
	});
	routerService.signUp = router.get('/signup', function(req, res) {
		res.render('signup');
	});
	routerService.logoutUser = router.get('/logout', function(req, res) {
		req.logout();
  	res.redirect('/');
	});

	routerService.loginUser = router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  	function(req, res) {

  		if( req.user.position == 'caregiver' ) {
  			res.redirect('/caregiver/dashboard/');
  		} else if ( req.user.position == 'family' ) {
  			res.redirect('/family/dashboard/');
  		}	  				
	 });

	routerService.uploadImages = router.post('/upload/images', upload.single('photo'), cloudinary.uploadImages);
	
	routerService.registerFamily = router.get('/register/family', function(req, res) {
		res.render('registerFamily', { message: req.flash('register') });
	});
	
	routerService.registerCareGiver = router.get('/register/caregiver', function(req, res) {
		res.render('registerCaregiver',  { message: req.flash('register') });
	});

	return routerService;

}());



