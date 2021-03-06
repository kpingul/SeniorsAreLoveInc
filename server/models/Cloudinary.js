'use strict';
var cloudinary 			= require('cloudinary'),
		CareGiverModel 	= require('./CareGiver');

module.exports = (function() {
	return {
		uploadImages:  function (req, res) {
		  cloudinary.uploader.upload(req.file.path, function(result) { 
		 	 if(result) {
		 	 	CareGiverModel
		 	 		.findOne({_id: req.user._id}, function(err, user) {
			 	 		if(err) {
			 	 			res.sendStatus(err);
			 	 		}
			 	 		user.cgImageUrl = result.url;
			 	 		user.save(function(err) {
			 	 			if(err)
			 	 				console.log(err);
			 	 			res.redirect('/caregiver/dashboard/')
			 	 		});
			 	 	});
		 	 } 
			}, {angle: 'exif'});
		}
	}
}());