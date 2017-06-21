'use strict';
module.exports = function(app) {
  var macaddr = require('../controllers/macaddr.controller');


  // todoList Routes
  app.route('/macaddr')
    .get(macaddr.getAll)
    .post(macaddr.create);


  app.route('/macaddr/:taskId')
    .get(macaddr.read)
    .put(macaddr.update)
    .delete(macaddr.delete);
};
