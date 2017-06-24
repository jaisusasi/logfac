var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
var bodyParser = require('body-parser');
var SerialNumber = require("models/snumModel")
db.bind('snumbers');

var service = {};

service.getAll = getAll;
service.create = create;
//service.update = update;
//service.delete = _delete;

module.exports = service;
function getAll() {
    var deferred = Q.defer();
    db.snumbers.find().toArray(function (err, snumbers) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
            console.log("Err..")
        }

        deferred.resolve(snumbers);
    });
    return deferred.promise;
}


function create(snumParam) {
    var deferred = Q.defer();
    createSerialNumbers();
    function createSerialNumbers() {
        var obj = snumParam;       
        snumParam.map(function (element) {
            element.supplierId = "Wistron";//get the input from facility user?
            element.uploadedDate = new Date();
        });
        db.snumbers.insertMany(
            obj, function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
