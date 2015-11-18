var express = require('express'),
  router = express.Router();

module.exports = function(request, response, next) {
  if (typeof request.session != 'undefined' && typeof request.session.name != 'undefined' && request.session.tipo == "estudiante") {
    console.log("sesion válida estudiante");
    next();
  } else {
    console.log("no ha iniciado sesion");
    response.redirect("/");
  }
}
