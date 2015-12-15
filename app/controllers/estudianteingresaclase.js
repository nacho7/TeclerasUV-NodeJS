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

  router.get('/estudiante/ingresaclase', auth_estudiante, function(request, response, next) {
    response.render('estudianteingresaclase', {});
  });

  router.get('/estudiante/ingresado', auth_estudiante, function(request, response, next) {
    queries.get_tv_clase_password.buscar_clase_password(request.query.password).then(function(info_clase){
      console.log(info_clase);
      var info;
      var pmid;
      var id_estudiante = request.session.name;
      if(info_clase != ''){
        info = info_clase[0].CLA_PASSWORD;
        var id_clase = info_clase[0].CLA_ID;
        pr_id = info_clase[0].CLA_ID;
        console.log("id usuario:",info);
        /*to do - Buscar en TV_ASISTENCIA_CLASE si existe el id alumno e id clase para saber si asistio o no*/
        queries.get_tv_clase_password.insertar_asistencia(request.session.name,id_clase).then(function(result_asistencia){
         console.log(result_asistencia);
       })
        queries.contestapregunta.buscar_pregunta_realizada_prid(pr_id).then(function(result_pregunta_realizada){
          console.log(result_pregunta_realizada);
          pmid = result_pregunta_realizada[0].PM_ID;
          prid = result_pregunta_realizada[0].PR_ID;

          queries.contestapregunta.buscar_pregunta_maestra_pmid(pmid).then(function(result_pregunta_maestra){
            //TV_PREGUNTA_REALIZADA
            pr_hora_inicio = result_pregunta_realizada[0].PR_HORA_INICIO;
            pr_hora_fin = result_pregunta_realizada[0].PR_HORA_FIN;
            pr_tiempo_max = result_pregunta_realizada[0].PR_TIEMPO_MAX;

            //TV_PREGUNTA_MAESTRA
            pm_nombre = result_pregunta_maestra[0].PM_NOMBRE;
            pm_tipo = result_pregunta_maestra[0].PM_TIPO;
            pm_texto = result_pregunta_maestra[0].PM_TEXTO;
            console.log(result_pregunta_maestra);
            queries.contestapregunta.buscar_respuestas_pmid(pmid).then(function(result_respuestas){
              console.log(result_respuestas);
              response.render('estudianteingresado', {codigo:info,nombre:pm_nombre,tipo:pm_tipo,texto:pm_texto,hora_inicio:pr_hora_inicio,hora_fin:pr_hora_fin,tiempo_max:pr_tiempo_max,respuestas:result_respuestas,tv_pr_id:prid,est_id:id_estudiante});
            });
          })
        })
      }else{
        info = '';
        response.render('errorstandard', {message : 'Error de password'});
      }

    })

});

  router.get('/estudiante/contestapregunta', auth_estudiante, function(request, response, next) {
    queries.contestapregunta.insertar_pregunta_respondida(request.query.pr_id, request.query.est_id,request.query.res_id,"2").then(function(tv_pregunta_respondida){
      console.log(tv_pregunta_respondida);
    });
    response.render('estudiantecontestapregunta', {});
  });

}
