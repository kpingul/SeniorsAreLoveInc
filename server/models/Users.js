'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

//CG is for caregivers who are applying
var UserModel = new Schema({
  createdOn: {
      type: Date,
      default: Date.now
  },
  position: String,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  fName: String,
  lName: String,
  gender: String,
  phone: String,
  contact : {
  	address: String,
  	city: String,
  	zipCode: String
  },
  family: {
    active: {
      type: Boolean,
      default: false
    },
    patient: String,
    patientMessages:[{
      createdOn: {
        type: Date,
        default: Date.now
      },
      fromId: String,
      fromFName: String,
      fromLName: String,
      message: String
    }],
    contactOfPatient: String,
    locationOfPatient: String,
    dailyActivities: [{
      type: String
    }],
    startDate: String,
    timesOfDayCare: String,
    daysOfCare: String,
    hoursPerWeekCare: String,
    preferGender: String,
    preferCareType: String
  },
  cgActive: {
    type: Boolean,
    default: false
  },
  cgImageUrl: String,
  cgMessages: [{
    createdOn: {
      type: Date,
      default: Date.now
    },
    fromId: String,
    fromFName: String,
    fromLName: String,
    message: String
  }],
  hourRate: String,
  careType: String,
  skills: [{
    type: String
  }],
  about: String,
  yrsExp: String,
  workExp: [{
    title: String,
    employer: String,
    start: String,
    end: String,
    desc: String
  }],
  educationExp: [{
    degree: String,
    school: String,
    city: String,
    start: String,
    end: String
  }],
  token: String
});
// methods ======================
// generating a hash
UserModel.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserModel.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


// var Schema = mongoose.Schema;

// var TodoModel = new Schema({
//   title: {
//     type: String
//   },
//   creator: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });
// var Todos = mongoose.model('todos', TodoModel);

module.exports = mongoose.model('users', UserModel);