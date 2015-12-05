var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  asignaturas = require('../queries/asignaturas.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);
/*Este router sólo consulta todas las asignaturas, no recibe nada
*/
  router.get('/docente/menu', auth_docente, function(request, response, next) {
    console.log(asignaturas);
    var idprofesor=request.session.name;
    asignaturas.consultas.buscar_asignaturas_profesor(idprofesor).then(function(asignaturas_res){
      console.log("asignaturas docente",asignaturas_res)
      var asignaturas = [];
      /*for i in algo es azúcar sintáctico de javascript para:
      var i = 0;
      for(i=0;i<algo.length;i++)
      */
      for(i in asignaturas_res){
        asignaturas.push({
          id: asignaturas_res[i].ASI_ID,
          nombre: asignaturas_res[i].ASI_NOMBRE,
          codigo: asignaturas_res[i].ASI_CODIGO,
          paralelo: asignaturas_res[i].PAR_NUMERO,
          paralelo_id: asignaturas_res[i].PAR_ID
        })
      }
      response.render('docenteconsultar', {
        asignaturas: asignaturas
      });
    })

  });
}
