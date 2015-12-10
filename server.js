var express   = require('express'),
    passport  = require('passport'),
    util      = require('util'),
    session   = require('express-session'),
    UserModel = require('./server/models/Users'),
    mongoose  = require('mongoose'),
    config    = require('./server/config'),
    app       = express();

mongoose.connect(config.development.db.url);
require('./server/express')(app);
require('./server/passport')();
require('./server/router')(app, config);

