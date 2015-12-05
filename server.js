var express   = require('express'),
    passport  = require('passport'),
    util      = require('util'),
    session   = require('express-session'),
    UserModel = require('./server/Users'),
    mongoose  = require('mongoose'),
    config    = require('./server/config'),
    multiparty  = require('multiparty'),
    azure     = require('azure-storage'),
    uuid = require('node-uuid'),
    app       = express();

mongoose.connect(config.development.db.url);
require('./server/express')(app);
require('./server/passport')();
require('./server/router')(app, config);


app.post('/api/images', function (req, res) {
    var form = new multiparty.Form();
    var size = '';
    var fileName = '';

    // Errors may be emitted
    form.on('error', function (err) {
        console.log('Error parsing form: ' + err.stack);
  
    });

    form.on('part', function (part) {
    	console.log('part');
    	console.log(part);
        var fileExtRegex = new RegExp(/\.(jpg|gif|png|jpeg)/g);
        if (part.filename.length === 0 || !fileExtRegex.test(part.filename)) {
            res.statusCode = 400;
        } else {
            var token = uuid.v4();

            size = part.byteCount;
            fileName = token + "." + part.filename.split('.').pop();
            console.log('filename: ' + fileName);
            console.log('fileSize: ' + (size / 1024));

            var blobService = azure.createBlobService('ineedtreez', 'QjSH10SpnUGU3kiIOsjAkjwGZQa89b3gO1AoZB+/zn/CA5Z2Lah5Kr2frtQwtPWJUwoW7mAcIDA1MTQi/nL9Ow==');
            blobService.createBlockBlobFromStream('dev', fileName, part, size, function (error) {
            	console.log('created')
                if (error) {
                    console.log(error);
                } else {
                    res.statusCode = 201; //created
                    res.json({
                        path: 'https://ineedtreez.blob.core.windows.net/dev/' + fileName
                    });
                    res.end();
                }
            });
        }
    });




    form.on('close', function () {
        console.log("Close Called - Conn. Closing");
    });
    form.parse(req);
});

// var Schema = mongoose.Schema;

// var FamilyModel = new Schema({
//   id: String,
//   name: String
// });

// var Family = mongoose.model('family', FamilyModel);



