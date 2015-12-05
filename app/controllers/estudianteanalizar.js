var express = require('express'),
  router = express.Router(),
  auth_estudiante = require("../middleware/auth_estudiante.js"),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/estudiante/seleccionar/asignatura', auth_estudiante, function(request, response, next) {
    response.render('estudianteseleccionarasignatura', {});
  });
  
  router.get('/estudiante/seleccionar/paralelo', auth_estudiante, function(request, response, next) {
    response.render('estudianteseleccionarparalelo', {});
  });
    router.get('/estudiante/seleccionar/fecha', auth_estudiante, function(request, response, next) {
    response.render('estudianteseleccionarfecha', {});
  });

    router.get('/estudiante/seleccionar/pregunta', auth_estudiante, function(request, response, next) {
    response.render('estudianteseleccionarpregunta', {});
  });

    router.get('/estudiante/ver/respuestas', auth_estudiante, function(request, response, next) {
    response.render('estudianteverrespuestas', {});
  });

}
