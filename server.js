var express     = require('express'),
    config      = require('./server/config'),
    app         = express();


//Connect to cloudinary services
require('./server/cloudinary')(config);
//Connect to mongodb instance
require('./server/mongoose')(config);
//Connect all required express middleware
require('./server/express')(app);
//Connect all required authentication strategies
require('./server/passport')();
//Connect Routes
require('./server/router')(app, config);

