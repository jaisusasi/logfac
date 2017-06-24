var config = require('config.json');
var express = require('express');
var router = express.Router();
var firmwareService = require('services/firmware.service');

// routes

router.get('/', getAll);
router.post('/create', create);
//router.get('/current', read);
//router.put('/:_id', update);
//router.delete('/:_id', _delete);

module.exports = router;

function getAll(req, res) {
    firmwareService.getAll()
        .then(function (firmware) {            
            console.log(firmware)
            res.send(firmware);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function read(req, res) {
    firmwareService.getById(req.firmwareaddress.sub)
        .then(function (firmwareaddress) {
            if (firmwareaddress) {
                res.send(firmwareaddress);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function create(req, res) {
   
    firmwareService.create(req)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*
function update(req, res) {
    firmwareService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    firmwareService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}*/
