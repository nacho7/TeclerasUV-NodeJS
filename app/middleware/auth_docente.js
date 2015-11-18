var express = require('express'),
    router = express.Router();
/*Esto es una función middleware, es decir, software del medio, que comprueba que sea docente. Recordar que primero hay que comprobar que el objeto exista y luego sus atributos.
*/
module.exports = function(request, response, next){
  if(typeof request.session != 'undefined' && typeof request.session.name != 'undefined' && request.session.tipo == "docente"){
    console.log("sesion válida docente", request.session.tipo);
    /*Ejecuta la función que viene después, donde se haya importado este módulo
    */
    next();
  }else{
    console.log("no ha iniciado sesion");
    response.redirect("/");
  }
}
