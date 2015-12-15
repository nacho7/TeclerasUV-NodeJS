var express = require('express'),
  router = express.Router(),
  auth_estudiante = require("../middleware/auth_estudiante.js"),
  queries = require('../queries/index.js');

module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);

  router.get('/errorstandard', auth_estudiante, function(request, response, next) {
    response.render('errorstandard', {});
  });

  router.get('/estudiante/entrar', auth_estudiante, function(request, response, next) {
    response.render('estudianteingresaclase', {});
  });

  router.get('/estudiante/ingresado', auth_estudiante, function(request, response, next) {
    if(request.query.password){
      request.session.password=request.query.password
    }
    queries.get_tv_clase_password.buscar_clase_password(request.session.password).then(function(info_clase){
      console.log(info_clase);
      var info;
      var pmid;
      var id_estudiante = request.session.name;
      if(info_clase.length>0){
        info = info_clase[0].CLA_PASSWORD;
        var id_clase = info_clase[0].CLA_ID;
        pr_id = info_clase[0].CLA_ID;
        console.log("id usuario:",info);
        /*to do - Buscar en TV_ASISTENCIA_CLASE si existe el id alumno e id clase para saber si asistio o no*/
                queries.get_tv_clase_password.buscar_asistencia(request.session.name, id_clase).then(function (estudiante_asistio){
                    if (estudiante_asistio.length > 0) {
                        return
                    } else {
                        queries.get_tv_clase_password.insertar_asistencia(request.session.name, id_clase).then(function (result_asistencia) {
                            console.log("insertado: ",result_asistencia);
                            app.io.sockets.to('docente:' + info).emit('actualizar pagina', {});
                        })
                    }
                    
                })
                  queries.get_tv_clase_password.buscar_pregunta_realizada(id_clase).then(function (preguntarealizada) {
                    console.log("pregunta realizada: ", preguntarealizada)
                    if (preguntarealizada.length > 0) {
                      queries.contestapregunta.buscar_pregunta_respondida_por_estudiante(preguntarealizada[0].PR_ID, request.session.name).then(function(respondida){
                      console.log("respondida: ", respondida)
                      if(respondida.length==0){
                        response.redirect("/estudiante/realizarpregunta/" + preguntarealizada[0].PM_ID + " / " + preguntarealizada[0].PR_ID)
                      }else{
                        response.render('estudianteingresado', { codigo: info });
                      }
                    })
                      } else {
                          response.render('estudianteingresado', { codigo: info });
                      }
        
                
        })
      }else{
        info = '';
        response.render('errorstandard', {message : 'Error de password'});
      }

    })

});

  router.get('/estudiante/contestapregunta', auth_estudiante, function(request, response, next) {
    
    queries.contestapregunta.buscar_pregunta_respondida_por_estudiante(request.query.pr_id, request.session.name).then(function(respondida){
      console.log("respondida: ", respondida)
      if(respondida.length>0){
        response.redirect('/estudiante/ingresado'+"?password="+request.session.password)
      }else{
            queries.get_tv_clase_password.buscar_clase_password(request.session.password).then(function(info_clase){
      var info;
      var id_estudiante = request.session.name;
      if(info_clase.length>0){
        info = info_clase[0].CLA_PASSWORD;
        var id_clase = info_clase[0].CLA_ID;
    queries.contestapregunta.insertar_pregunta_respondida(request.query.pr_id, request.query.est_id,request.query.res_id,"2").then(function(tv_pregunta_respondida){
      console.log(tv_pregunta_respondida);
      app.io.sockets.to('docente:' + request.session.password).emit('actualizar pagina', {});
    queries.get_tv_clase_password.buscar_pregunta_realizada(id_clase).then(function (preguntarealizada) {
          console.log("pregunta realizada: ", preguntarealizada)
          
          if (preguntarealizada.length > 0) {
            response.redirect('/estudiante/ingresado'+"?password="+request.session.password)
              
          } else {
              response.redirect("/estudiante/realizarpregunta/" + preguntarealizada[0].PM_ID + " / " + preguntarealizada[0].PR_ID)
          }
      
    });
  });

}else{
  response.render('errorstandard', {message : 'Error de password'});
}
})
      }
    })

    })
  router.get('/estudiante/esperandopregunta/:codigo', auth_estudiante, function(request, response, next) {
    response.render('estudianteesperandopregunta', {codigo: request.params.codigo});

  })
}
