'use strict';
var methodOverride 	= require('method-override'),
    cookieParser 		= require('cookie-parser'),
    session 				= require('express-session'),
    express 				= require('express'),
    bodyParser 			= require('body-parser'),
    passport 				= require('passport'),
    flash   				= require('connect-flash'),
    config   				= require('./config');

/* 
	@params
	app contains the express application 
*/
module.exports = function(app) {

	// Custom middleware to allow for cross domain requests
	var allowCrossDomain = function(req, res, next) {
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type');
	    next();
	  }

	  // setting EJS is the main templating engine
	  app.set('view engine', 'ejs');
	  // when router renders a template
	  // the location of the templates are located
	  // to the current directory in the views folder
	  app.set('views', __dirname + '/views');

	  // middleware that uploads any static files
	  app.use(express.static(__dirname + '/../'))

	  // middleware that allows for error handling 
	  // messaging to occur within the login section
	  app.use(flash());

	 	// middleware to allow for cookies
	  app.use(cookieParser());
	  // middleware that allows to parse the body of 
	  // incoming requests from the cliet using req.body
	  app.use(bodyParser.json());
	  app.use(bodyParser.urlencoded({ extended: false }))
	  app.use(methodOverride());

	  // middleware that creates a session 
	  // when user is authenticated 
	  app.use(session({ 
	  		secret: 'keyboard cat', 
	  		cookie: {maxAge: 10000000},
	  		resave: true,   
	  		saveUninitialized: true, 
	  }))
	  //Initialize Passport
	  app.use(passport.initialize());
	  app.use(passport.session());

	  // custom middleware that allows cross
	  // domain requests  
	  app.use(allowCrossDomain);

	  // listens for the servet at a port
	  app.listen(config.development.db.port);
};

