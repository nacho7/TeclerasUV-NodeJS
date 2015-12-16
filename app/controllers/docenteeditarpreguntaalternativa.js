var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js'),
  path = require('path'),
  fs = require('fs'),
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
    asignatura={
          idasignatura: request.body.idasignatura,
          idparalelo: request.body.idparalelo
        } 
    if(request.files.imagen2.originalFilename==''){
      var nombre_nuevo=null
    }else{
    var nombre_nuevo = request.files.imagen2.originalFilename;

    /*la foto en este caso se guarda en archivos temporales*/
    var ruta_archivo= request.files.imagen2.path;

    var nueva_ruta = "./public/preguntas/imagenes/" + nombre_nuevo;

    /*copia el archivo desde tmp hasta nueva ruta*/
    fs.createReadStream(ruta_archivo).pipe(fs.createWriteStream(nueva_ruta));
    }
    queries.gestionar_pregunta.actualizar_pregunta(request.body.idpregunta, request.body.nombrepregunta, request.body.pregunta,request.body.url_video,nombre_nuevo, request.body.explicacion)
      .then(function(actualizar_pregunta) {
        console.log("actualizado pregunta:", actualizar_pregunta)
      queries.gestionar_pregunta.eliminar_respuesta(request.body.idpregunta).then(function(eliminar_respuesta) {
        console.log("respuestas eliminadas: ", eliminar_respuesta)
        console.log("respuestas ", request.body.respuesta)
        console.log("correctas",request.body.correctas)
        for(i in request.body.respuesta){ 
                  queries.gestionar_pregunta.insertar_respuesta(request.body.respuesta[i],request.body.idpregunta,request.body.correctas[i])
                    .then(function(insertado_respuesta) {
                    console.log("insertado respuesta:", insertado_respuesta);
                  })

      }
            response.render("docenteeditarpreguntaalternativasuccess",{
            asignatura: asignatura
        })
            // response.redirect("/docente/editarpreguntaalternativa/success")
            // return
      
      })
      
    })
      .catch(function(error) {
        console.log(error)
        /*Como ven, acá hay dos redirect, pero no se ejecutan uno y después el otro, ya que cuando entra a un callback, el flujo de ejecución cambia
         */
        //response.redirect("crearpreguntaalternativa");
        next()
      })
   
  })
}