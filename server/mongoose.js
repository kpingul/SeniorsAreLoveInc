'use strict';

var mongoose = require('mongoose');

module.exports = function(config) {
	mongoose.connect(config.development.db.url);
	// CONNECTION EVENTS
	// When successfully connected
	mongoose.connection.on('connected', function () {  
	  console.log('successfully connected to mongodb');
	}); 

	// If the connection throws an error
	mongoose.connection.on('error',function (err) {  
	  console.log('connection error to mongodb: ' + err);
	}); 

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {  
	  console.log('disconnected to mongodb'); 
	});

}