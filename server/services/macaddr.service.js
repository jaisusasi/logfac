var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('macaddresses');
var service = {};

service.getAll = getAll;
service.create = create;
//service.update = update;
//service.delete = _delete;

module.exports = service;
function getAll() {
    var deferred = Q.defer();

    db.macaddresses.find().toArray(function (err, macaddresses) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
          console.log("Err..")
        }

        deferred.resolve(macaddresses);
    });

    return deferred.promise;
}


function create(macaddrParam) {
    var deferred = Q.defer();

    createMacAddress();

    function createMacAddress() {
        var obj = macaddrParam;
        obj.isAssigned=false;
        obj.createdDate=new Date();
        db.macaddresses.insert(
            obj,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
