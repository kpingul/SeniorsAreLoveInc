'use strict';

var cloudinary = require('cloudinary');

module.exports = function(config) {
	//Connect to cloudinary services
	cloudinary.config({ 
  	cloud_name: config.development.cloudinary.cloud_name, 
  	api_key: config.development.cloudinary.api_key, 
 		api_secret: config.development.cloudinary.api_secret 
	});
};