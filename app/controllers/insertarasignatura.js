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
    /*En este caso puse el catch acá, para eso, tengo que quitarlo de las consultas
    */
      .catch(function(error) {
        // Ooops, do some error-handling
        console.log(error);
        /*Como ven, acá hay dos redirect, pero no se ejecutan uno y después el otro, ya que cuando entra a un callback, el flujo de ejecución cambia
        */
        response.redirect("/admin/insertar");
      })
    response.redirect("/docente/consultar");
  })
}
