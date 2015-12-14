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

  router.get('/docente/editarpreguntaalternativa/:idasignatura/:idparalelo/:idpregunta', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    var asignatura ={
        idasignatura: request.params.idasignatura, 
        idparalelo: request.params.idparalelo,
        idpregunta: request.params.idpregunta
    }
    queries.gestionar_pregunta.buscar_pregunta(request.params.idpregunta).then(function(buscar_pregunta_res) {
        console.log("buscar pregunta:", buscar_pregunta_res);
        pregunta={
        nombre: buscar_pregunta_res[0].PM_NOMBRE,
        pregunta: buscar_pregunta_res[0].PM_TEXTO,
        explicacion: buscar_pregunta_res[0].PM_EXPLICACION,
        url_video: buscar_pregunta_res[0].PM_RUTA_VIDEO,
        ruta_imagen: buscar_pregunta_res[0].PM_RUTA_IMAGEN
        }
      queries.gestionar_pregunta.buscar_respuesta(request.params.idpregunta).then(function(buscar_respuesta_res) {
        console.log("buscar respuesta",buscar_respuesta_res)
        var respuestas=[];
        for(i in buscar_respuesta_res){
        respuestas.push({
          respuesta: buscar_respuesta_res[i].RES_TEXTO,
          correcta: buscar_respuesta_res[i].PM_CORRECTA
        })
      }
        response.render('docenteeditarpreguntaalternativa', {
                          asignatura: asignatura,
                          pregunta: pregunta,
                          respuestas: respuestas
    })
      })
        })
    
  })
  router.post("/docente/editarpreguntaalternativa", multipart(), auth_docente, function(request, response, next) {
    console.log(request.files)
    console.log("formulario",request.body)
    
    queries.gestionar_pregunta.actualizar_pregunta(request.body.idpregunta, request.body.nombrepregunta, request.body.pregunta,request.body.url_video,"", request.body.explicacion)
      .then(function(actualizar_pregunta) {
        console.log("insertado pregunta:", actualizar_pregunta)
      })
      .catch(function(error) {
        console.log(error)
        /*Como ven, acá hay dos redirect, pero no se ejecutan uno y después el otro, ya que cuando entra a un callback, el flujo de ejecución cambia
         */
        //response.redirect("crearpreguntaalternativa");
        next()
      })
      
     response.redirect("back")
    return
      
  })
}