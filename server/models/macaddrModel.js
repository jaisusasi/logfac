'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  macaddress: {
    type: String,
    Required: 'Please input macaddress'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  lastAssignedDate: {
    type: Date,
    default: Date.now
  },
  isAssigned: {
    type: Boolean,
    default: false
  },
  status: {
    type: [{
      type: String,
      enum: ['retired', 'new', 'unassignable']
    }],
    default: ['new']
  }
});

module.exports = mongoose.model('MacAddress', TaskSchema);
