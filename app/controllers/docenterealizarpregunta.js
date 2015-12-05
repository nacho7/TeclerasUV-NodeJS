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

  router.get('/docente/realizar/:idasignatura/:idparalelo', auth_docente, function(request, response, next) {

    preguntas.consultas.buscar_preguntas_asignatura(request.params.idasignatura, request.params.idparalelo)
    .then(function(preguntas_res) {
      console.log("Preguntas del ramo/paralelo: ",preguntas_res)

      var preguntas = [];
      for(i in preguntas_res){
        preguntas.push({
          id: preguntas_res[i].PM_ID,
          nombre: preguntas_res[i].PM_NOMBRE,
          tipo: preguntas_res[i].PM_TIPO,
        })
      }


    response.render('docenterealizarpregunta', {preguntas: preguntas});
    })
  });

}
