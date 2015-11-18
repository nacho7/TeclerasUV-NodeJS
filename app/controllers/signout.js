var express = require('express'),
  router = express.Router(),
  auth_general = require("../middleware/auth_general.js"),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

router.post('/signout', auth_general, function(request, response, next) {
  /*Para cerrar una sesión de manera artesanal, simplemente declaramos no definidos los campos nombre y tipo de las coockies
  */
  request.session.name=undefined;
  request.session.tipo=undefined;
  response.redirect("/");
});
}
