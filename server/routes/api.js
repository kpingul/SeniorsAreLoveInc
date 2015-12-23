'use strict';

var express 				= require('express'),
		config 					= require('./../config'),
    cloudinary 			= require('./../models/Cloudinary'),
    CareGiverModel 	= require('./../models/CareGiver'),
    FamilyModel 		= require('./../models/Family'),
    multer     			= require('multer'),
    upload 		 			= multer({dest: './uploads/'}),
		passport 				= require('passport');

module.exports = (function() {
	var router = express.Router(),
			routerService = {};

			routerService.getCareGivers =  router.get('/caregivers', function(req, res) {
				CareGiverModel.find({}, function(err, careGivers) {
					if(err)
						res.sendStatus(err)
					res.send(careGivers);
				});
			});

			
			routerService.getCareGiverJobs = router.get('/caregiverJobs', function(req, res) {
				FamilyModel.find({}, function(err, families) {
					if(err)
						res.sendStatus(err)
					res.send(families);
					
				});
			});	


	return routerService;

}());
