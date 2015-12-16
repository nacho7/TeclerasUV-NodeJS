var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  preguntas = require('../queries/preguntas.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  //router consulta las preguntas datos dela asignatura

  router.get('/docente/realizar/:pregunta_id/:idclase/:idasig/:idpara/:pregtitulo', 
    auth_docente, function(request, response, next) {

    //console.log(" EN EL CONTROLADOR REALIZAR PREGUNTA, RECIBO LA ID-----> "+request.params.pregunta_id)

    console.log("el controlador sabe que pm id es : "+request.params.pregunta_id+" y que id clase es : "+request.params.idclase)
        preguntas.consultas.insertar_pregunta_realizada(request.params.pregunta_id, request.params.idclase).then(function (pregunta_realizada){
    app.io.sockets.to('estudiante:'+request.session.codigoclase).emit('pregunta realizada', {pmid: request.params.pregunta_id, prid: pregunta_realizada.PR_ID});
    

    var contador=0;
            var asistencia = 0;
            response.redirect("/docente/count/" + request.params.pregunta_id + "/" + request.params.idclase + "/" + request.params.idasig + "/" + request.params.idpara + "/" + request.params.pregtitulo);
          /* 
    response.render('docentepreguntarealizada', {
      pregid : request.params.pregunta_id,
      clasid : request.params.idclase,
      idasig : request.params.idasig,
                idpara : request.params.idpara,
                codigo: request.session.codigoclase,
      titulo : request.params.pregtitulo,
      contador: contador,
      asistencia: asistencia
            });
    */
        })
  });


  router.get('/docente/count/:pregunta_id/:idclase/:idasig/:idpara/:pregtitulo', 
  auth_docente, function(request, response, next) {
    

preguntas.consultas.contar_respuestas(request.params.pregunta_id,request.params.idclase)
.then(function(preguntas_res){
        console.log("los que coinciden son: ", preguntas_res);

        var contador=0;
        for(i in preguntas_res){
        contador++;
      }

        preguntas.consultas.contar_asistencia(request.params.idclase)
        .then(function(preguntas2_res){
               console.log("los que coinciden son: ", preguntas2_res);
 
                var contador2=0;
                for(i in preguntas2_res){
                contador2++;                          
              }
                
                response.render('docentepreguntarealizada', {
                pregid : request.params.pregunta_id, 
                clasid : request.params.idclase,
                idasig : request.params.idasig,
                idpara : request.params.idpara,
                    titulo : request.params.pregtitulo,
                    codigo: request.session.codigoclase,
                contador: contador,
                asistencia: contador2});
             })

      })

  });





  router.get('/docente/cerrar/:pregunta_id/:idclase/:idasig/:idpara', auth_docente, function(request, response, next) {

    app.io.sockets.to('estudiante:'+request.session.codigoclase).emit('pregunta cerrada', {});
   //console.log("el controlador sabe que pm id es : "+request.params.pregunta_id+" y que id clase es : "+request.params.idclase)
   preguntas.consultas.cerrar_pregunta_realizada(request.params.pregunta_id,request.params.idclase);


    response.render('docentecerrarpregunta', {
      pregid : request.params.pregunta_id,
      clasid : request.params.idclase,
      idasig : request.params.idasig,
      idpara : request.params.idpara});
    
  });



}
