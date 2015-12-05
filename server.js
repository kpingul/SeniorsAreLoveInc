var express   = require('express'),
    passport  = require('passport'),
    util      = require('util'),
    session   = require('express-session'),
    UserModel = require('./server/Users'),
    mongoose  = require('mongoose'),
    config    = require('./server/config'),
    app       = express();

mongoose.connect(config.development.db.url);
require('./server/express')(app);
require('./server/passport')();
require('./server/router')(app, config);

// var Schema = mongoose.Schema;

// var FamilyModel = new Schema({
//   id: String,
//   name: String
// });

// var Family = mongoose.model('family', FamilyModel);



