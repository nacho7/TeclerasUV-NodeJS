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

  router.get('/admin/insertar', auth_docente, function(request, response, next) {
    response.render('insertarasignatura', {});
  });
  router.post("/admin/insertar", auth_docente, function(request, response, next) {
    queries.inserts.insertar_asignatura(request.body.nombre, request.body.codigo)
      .then(function(insertado_asignatura) {
        console.log("insertado:", insertado_asignatura);
        response.redirect("/docente/menu");
        return;
      })
      .catch(function(error) {
        console.log(error);
        /*Como ven, acá hay dos redirect, pero no se ejecutan uno y después el otro, ya que cuando entra a un callback, el flujo de ejecución cambia
         */
        response.redirect("/admin/insertar");
      })
  })
}
