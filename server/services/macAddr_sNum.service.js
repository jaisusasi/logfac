var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var snumService = require('services/snum.service');
var macService = require('services/macaddr.service');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });

db.bind('macaddress_serialnumber');
var service = {};

service.getAll = getAll;
service.create = create;
//service.update = update;
//service.delete = _delete;

module.exports = service;
function getAll() {
    var deferred = Q.defer();

    db.macaddress_serialnumber.find().toArray(function (err, macaddress_serialnumber) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
            console.log("Err..")
        }

        deferred.resolve(macaddress_serialnumber);
    });

    return deferred.promise;
}


function create(serialNumber) {
    console.log(serialNumber)
    var deferred = Q.defer();
    console.log(serialNumber.length)
    snumService.create(serialNumber);
    var macaddr;
    macService.GetRequiredMacAddressBlock(serialNumber.length)
        .then(function (macaddresses) {
            // console.log(macaddresses)

            AssignMacAddress();

            function AssignMacAddress() {
             /*   console.log(serialNumber);
                console.log(macaddresses);
                console.log("mac")*/
                macaddresses.forEach(function (element, index) {
                    serialNumber[index]["macAddress"] = element.macAddress;
                });
              //  console.log(serialNumber)
                db.macaddress_serialnumber.insertMany(
                    serialNumber,
                    function (err, doc) {
                        if (err) deferred.reject(err.name + ': ' + err.message);

                        deferred.resolve();
                    });
            }
        })
        .catch(function (err) {
            console.log(err)
            // res.status(400).send(err);
        });
    return deferred.promise;
}
