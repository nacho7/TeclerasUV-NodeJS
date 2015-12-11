var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  preguntas = require('../queries/preguntas.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  //router consulta las preguntas datos dela asignatura

  router.get('/docente/realizar/:pregunta_id', auth_docente, function(request, response, next) {

    console.log(" EN EL CONTROLADOR REALIZAR PREGUNTA, RECIBO LA ID-----> "+request.params.pregunta_id)

    response.render('docenterealizarpregunta', {preguntas: preguntas});
    
  });

}
