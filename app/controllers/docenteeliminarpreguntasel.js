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

  router.get('/docente/eliminarpreguntasel/:idasignatura/:idparalelo/:tipo/:idpregunta', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    datos={
              idasignatura: request.params.idasignatura,
              idparalelo: request.params.idparalelo,
              tipo: request.params.tipo,
              idpregunta: request.params.idpregunta
            }
    queries.gestionar_pregunta.buscar_pregunta_realizada(request.params.idpregunta).then(function(pregunta_realizada_id){
        console.log("preguntas realizadas id pr", pregunta_realizada_id)
        
        for(i in pregunta_realizada_id){
          queries.gestionar_pregunta.eliminar_pregunta_respondida_pr_id(pregunta_realizada_id[i].PR_ID).then(function(eliminado_pregunta_respondida){
            console.log("elimar pregunta respondida", eliminado_pregunta_respondida)
          })
        }
      queries.gestionar_pregunta.eliminar_pregunta_realizada_pm_id(request.params.idpregunta).then(function(eliminado_pregunta_realizada){
        queries.gestionar_pregunta.eliminar_respuesta(request.params.idpregunta).then(function(eliminado_respuesta){
        console.log("eliminado respuesta: ", eliminado_respuesta)
        queries.gestionar_pregunta.eliminar_pregunta(request.params.idpregunta).then(function(eliminado_pregunta){
        console.log("eliminado pregunta: ", eliminado_pregunta)

    })
    })
    })
      
    })
   response.render('docenteeliminarpreguntasel', {
        datos: datos
      })
      return   
  })

}
