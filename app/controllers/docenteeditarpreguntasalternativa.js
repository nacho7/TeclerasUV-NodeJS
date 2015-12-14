var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');

module.exports = function(app) {
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/docente/editarpreguntasalternativa/:idasignatura/:idparalelo', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    var idprofesor=request.session.name;
    queries.gestionar_pregunta.buscar_preguntas_profesor(idprofesor, request.params.idasignatura, request.params.idparalelo, "1").then(function(preguntas_res){
    console.log("preguntas docente",preguntas_res)
    var preguntas=[];
     for(i in preguntas_res){
        preguntas.push({
          id: preguntas_res[i].PM_ID,
          nombre: preguntas_res[i].PM_NOMBRE,
          pregunta: preguntas_res[i].PM_TEXTO,
          explicacion: preguntas_res[i].PM_EXPLICACION,
          tipo: preguntas_res[i].PM_TIPO,
          idparalelo: preguntas_res[i].TV_PARALELO_PAR_ID,
          idasignatura: preguntas_res[i].TV_PARALELO_ASI_ID
        })
        }
    console.log("preguntas: ", preguntas)
    response.render('docenteditarpreguntasalternativa', {
      preguntas: preguntas
    })
    })
  })
}
