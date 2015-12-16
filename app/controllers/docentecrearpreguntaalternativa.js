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

  router.get('/docente/crearpreguntaalternativa/:idasignatura/:idparalelo', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    
    asignatura={
          idasignatura: request.params.idasignatura,
          idparalelo: request.params.idparalelo
    }
      response.render('docentecrearpreguntaalternativa', {
          asignatura: asignatura
    });
  });
  router.post("/docente/crearpreguntaalternativa",multipart(),  auth_docente, function(request, response, next) {
    console.log(request.files);
    console.log("formulario",request.body);
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

    queries.gestionar_pregunta.insertar_pregunta(request.body.nombrepregunta, request.body.pregunta ,'1',request.body.url_video,nombre_nuevo, request.body.explicacion, request.body.idparalelo, request.body.idasignatura, request.session.name)
      .then(function(insertado_pregunta) {
        console.log("insertado pregunta:", insertado_pregunta);
        asignatura={
          idasignatura: request.body.idasignatura,
          idparalelo: request.body.idparalelo,
        }
        for(i in request.body.respuesta){ 
                  queries.gestionar_pregunta.insertar_respuesta(request.body.respuesta[i],insertado_pregunta.PM_ID,request.body.correctas[i])
                    .then(function(insertado_respuesta) {
                    console.log("insertado respuesta:", insertado_respuesta);
                  })

    }
      response.render('docentecrearpreguntaalternativasuccess',{
      asignatura: asignatura

    })
      })
      .catch(function(error) {
        console.log(error);
        next();
      })

    return;
      
  })
 

}