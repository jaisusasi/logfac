﻿var config = require('config.json');
var express = require('express');
var router = express.Router();
var macService = require('services/macaddr.service');

// routes

router.get('/', getAll);
router.post('/create', create);
//router.get('/current', read);
//router.put('/:_id', update);
//router.delete('/:_id', _delete);

module.exports = router;

function getAll(req, res) {
    macService.getAll()
        .then(function (macaddresses) {            
            console.log(macaddresses)
            res.send(macaddresses);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function read(req, res) {
    macService.getById(req.macaddress.sub)
        .then(function (macaddress) {
            if (macaddress) {
                res.send(macaddress);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function create(req, res) {
    macService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*
function update(req, res) {
    macService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    macService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}*/
