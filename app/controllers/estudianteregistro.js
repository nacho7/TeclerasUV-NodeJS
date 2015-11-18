var express = require('express'),
  router = express.Router(),
  config = require('../../config/config'),
  crypto = require('crypto'),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/estudiante/registro', function(request, response, next) {
    response.render('estudianteregistro', {
      error: request.query.error
    });
  });
  router.post('/estudiante/registro', function(request, response, next) {
    console.log(request.body);
    queries.login_y_registro.buscar_estudiantes.then(function(resultado_estudiantes) {
      console.log("resultado estudiantes:", resultado_estudiantes);
      if (resultado_estudiantes != null && resultado_estudiantes.length > 0) {
        console.log("no vacio");
        for (user in resultado_estudiantes) {
          if (resultado_estudiantes[user].dataValues.EST_CORREO != request.body.email) {
            registro(request, response, next);
          }
        }
        response.redirect("/estudiante/registro?error=existe");
      } else {
        console.log("vacio");
        registro(request, response, next);
      }
    })

    function registro(request, response, next) {
      if (request.body.contrasena == request.body.contrasena2) {
        var pass_hasheada = crypto
          .createHmac("sha1", config.palabra_secreta)
          .update(request.body.contrasena)
          .digest('hex');
        console.log("pass_hasheada: ", pass_hasheada);
        queries.login_y_registro.insertar_un_estudiante(request.body.nombre, request.body.email, pass_hasheada).then(function(resultado_estudiante) {
          console.log(resultado_estudiante);

          request.session.name = resultado_estudiante.dataValues.EST_ID;
          request.session.tipo = "estudiante";
          response.redirect("/estudiante/menu");

        })
      } else {
        response.redirect("/estudiante/registro?error=contrasena");
      }

    };

  })
};
