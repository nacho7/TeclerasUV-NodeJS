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
/*Este router sólo consulta todas las asignaturas, no recibe nada
*/
  router.get('/estudiante/consultar', auth_estudiante, function(request, response, next) {
    /*Estos son datos de prueba, simplemente para que vean que se puede :v
     */
    queries.consultas.buscar_asignaturas.then(function(asignaturas_res){
      var asignaturas = [];
      /*for i in algo es azúcar sintáctico de javascript para:
      var i = 0;
      for(i=0;i<algo.length;i++)
      */
      for(i in asignaturas_res){
        asignaturas.push({
          id: asignaturas_res[i].dataValues.ASI_ID,
          nombre: asignaturas_res[i].dataValues.ASI_NOMBRE,
          codigo: asignaturas_res[i].dataValues.ASI_CODIGO
        })
      }
      response.render('estudianteconsultar', {
        asignaturas: asignaturas
      });
    })

  });
}
