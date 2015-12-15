'use strict';

var express = require('express'),
		config = require('./../config'),
    cloudinary = require('./../models/Cloudinary'),
    UserModel = require('./../models/Users'),
    multer     = require('multer'),
    upload 		 = multer({dest: './uploads/'}),
		passport = require('passport');

module.exports = (function() {
	var router = express.Router(),
			routerService = {};

			routerService.getCareGivers =  router.get('/caregivers', function(req, res) {
				UserModel.find({}, function(err, users) {
					var careGivers = [];
					if(err)
						res.sendStatus(err)
					users.forEach(function(user, index) {
						if(user.position == 'caregiver')
							careGivers.push(user);
					});
					res.send(careGivers);
				});
			});

			
			routerService.getCareGiverJobs = router.get('/caregiverJobs', function(req, res) {
				UserModel.find({}, function(err, users) {
					var family = [];
					if(err)
						res.sendStatus(err)
					users.forEach(function(user, index) {
						if(user.position == 'family')
							family.push(user);
					});
					res.send(family);
					
				});
			});	


	return routerService;

}());
