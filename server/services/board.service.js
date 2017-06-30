var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('boards');
var service = {};

service.getAll = getAll;
service.create = create;
//service.update = update;
//service.delete = _delete;

module.exports = service;
function getAll() {
    var deferred = Q.defer();

    db.boards.find().toArray(function (err, boards) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
            console.log("Err..")
        }
        deferred.resolve(boards);
    });

    return deferred.promise;
}

function create(boardParam) {
    var deferred = Q.defer();

    createBoard();

    function createBoard() {
        var obj = boardParam;
        console.log(boardParam)
        boardParam.map(function(element)
        {
            element.createdDate = new Date();
        });

        db.boards.insert(
            obj,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
