var config = require('config.json');
var express = require('express');
var router = express.Router();
var sNumService = require('services/snum.service');

// routes

router.get('/', getAll);
router.post('/create', create);
//router.get('/current', getById);
//router.put('/:_id', update);
//router.delete('/:_id', _delete);

module.exports = router;

function getAll(req, res) {
  sNumService.getAll()
        .then(function (snums) {
            res.send(snums);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    sNumService.getById(req.params._id)
        .then(function () {
            if (sNum) {
                res.send(sNum);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function create(req, res) {
    sNumService.create(req.body)
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
