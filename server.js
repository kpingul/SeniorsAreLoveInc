var express   = require('express'),
    passport  = require('passport'),
    util      = require('util'),
    cloudinary = require('cloudinary'),
    session   = require('express-session'),
    UserModel = require('./server/models/Users'),
    mongoose  = require('mongoose'),
    config    = require('./server/config'),
    app       = express();

cloudinary.config({ 
  cloud_name: config.development.cloudinary.cloud_name, 
  api_key: config.development.cloudinary.api_key, 
 	api_secret: config.development.cloudinary.api_secret 
});

mongoose.connect(config.development.db.url);
require('./server/express')(app);
require('./server/passport')();
require('./server/router')(app, config);

