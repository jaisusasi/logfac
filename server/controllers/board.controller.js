var config = require('config.json');
var express = require('express');
var router = express.Router();
var boardService = require('services/board.service');

// routes

router.get('/', getAll);
router.post('/create', create);
//router.get('/current', read);
//router.put('/:_id', update);
//router.delete('/:_id', _delete);

module.exports = router;

function getAll(req, res) {
    boardService.getAll()
        .then(function (board) {            
            console.log(board)
            res.send(board);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function read(req, res) {
    boardService.getById(req.board.sub)
        .then(function (board) {
            if (board) {
                res.send(board);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function create(req, res) {
    boardService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*
function update(req, res) {
    boardService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    boardService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}*/
