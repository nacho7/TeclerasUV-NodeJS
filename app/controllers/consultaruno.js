var express = require('express'),
  router = express.Router(),
  auth_general = require("../middleware/auth_general.js"),
  asignaturas = require('../queries/asignaturas.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);
/*El :idasignatura es una variable recibida, pero en forma de url.
Ejemplos pueden ser:
/consultaruno/algo
/consultaruno/otracosa
/consultaruno/20
etc
Se recibe en:
request.params.nombreparametr
o*/
  router.get('/consultaruno/:idasignatura/:idparalelo', auth_general, function(request, response, next) {
    asignaturas.consultas.buscar_una_asignatura(request.params.idasignatura, request.params.idparalelo)
    .then(function(asignatura_res) {
      console.log(asignatura_res);
      var asignatura;
      if (asignatura_res != null) {
      asignatura = {
        id: asignatura_res[0].ASI_ID,
        nombre: asignatura_res[0].ASI_NOMBRE,
        codigo: asignatura_res[0].ASI_CODIGO,
        paralelo: asignatura_res[0].PAR_NUMERO,
      }
      /*Recordar que si usan:
      console.log("esto es"+mivar)
      transformará mivar a string, y si es un objeto les quedará simplemente [Object], así que usen coma siempre
      */
      console.log("asignaturauno:",asignatura);
    }else{
      asignatura ={};
    }
      response.render('consultaruno', {
        asignatura: asignatura
      });
    })
  });
}
