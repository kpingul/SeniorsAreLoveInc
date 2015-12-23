'use strict';
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;


//Notes
// don't need to call /api/messages/:id with userId 
// since req is storing the user session within the middleware
// So, we can create an endpoint /api/messages and
// use express middleware req object to grab the user ID needed
// to grab all the messages with the id of UserId

//What about caching?
//if the messages are stored as arrays of objects
  //we lose the ability to cache each message
//but, if we store each model as a message 
  //we can cache the object as is

var MessageModel = new Schema({
  sent: {
    type: Date,
    default: Date.now
  },
  from: {
    type: Schema.ObjectId,
    ref: 'Messages'
  },
  fName: String,
  lName: String,
  recipient: String,
  message: String
});




module.exports = mongoose.model('Messages', MessageModel);