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
    queries.gestionar_pregunta.eliminar_pregunta_respondida_pm_id(request.params.idpregunta).then(function(eliminado_pregunta_respondida){
    queries.gestionar_pregunta.eliminar_respuesta(request.params.idpregunta).then(function(eliminado_respuesta){
      queries.gestionar_pregunta.eliminar_pregunta(request.params.idpregunta).then(function(eliminado_pregunta){
      console.log("eliminado pregunta",eliminado_pregunta)
      
    })
   

    })
   response.render('docenteeliminarpreguntasel', {})
  })
  
  response.redirect("back");
  })

}
