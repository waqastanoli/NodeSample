'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
  firstName: {
    type: String,
    required: "First Name is required"
  },
  lastName: {
    type: String,
    required: "Last Name is required"
  },
  userName: {
    type: String,
    unique: true,
    required: "UserName is required"    
  },
  email: {
    type: String,
    unique: true,
    required: "Email is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt:{
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Users', Schema);