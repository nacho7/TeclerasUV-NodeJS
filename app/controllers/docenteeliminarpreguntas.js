var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');
  multipart = require('connect-multiparty');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/docente/eliminarpreguntas/:idasignatura/:idparalelo/:tipo', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    asignatura ={
        idasignatura: request.params.idasignatura, 
        idparalelo: request.params.idparalelo
    }
    var idprofesor=request.session.name;
    queries.gestionar_pregunta.buscar_preguntas_profesor(idprofesor, request.params.idasignatura, request.params.idparalelo, request.params.tipo).then(function(preguntas_res){
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
    response.render('docenteeliminarpreguntas', {
      preguntas: preguntas
    })
    })
  })
}