var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
var bodyParser = require('body-parser');
var fs=require("fs")

db.bind('firmware');

var service = {};

service.getAll = getAll;
service.create = create;
//service.update = update;
//service.delete = _delete;

module.exports = service;
function getAll() {
    var deferred = Q.defer();
    db.firmware.find().toArray(function (err, firmware) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
            console.log("Err..")
        }

        deferred.resolve(firmware);
    });
    return deferred.promise;
}


function create(firmwareReq) {
    var deferred = Q.defer();
    createfirmwaretestcase();
    function createfirmwaretestcase() {
        console.log(firmwareReq.files)
        console.log(firmwareReq.files.testcase.path)
        console.log(firmwareReq.fields.firmware)

        var testcaseFile = fs.readFileSync(firmwareReq.files.testcase.path);
        var encodedFile = testcaseFile.toString('base64');
        var firmwareTestCase = {

            img: Buffer(encodedFile, 'base64')
        };
        db.firmware.insert(firmwareTestCase, function (err, result) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            fs.unlink(firmwareReq.files.testcase.path, function (err) {
                if (err) { console.log(err) };);
            });

            deferred.resolve();
        });
    }
    return deferred.promise;
}
