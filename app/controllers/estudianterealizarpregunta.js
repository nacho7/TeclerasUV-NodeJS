var express = require('express'),
    router = express.Router(),
    auth_estudiante = require("../middleware/auth_estudiante.js"),
    queries = require('../queries/index.js');

module.exports = function (app) {
    
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use('/', router);
    
    router.get('/estudiante/realizarpregunta/:pmid/:prid', auth_estudiante, function (request, response, next) {
        id_estudiante = request.session.name
        pr_id= request.params.prid
        queries.contestapregunta.buscar_pregunta_respondida_por_estudiante(pr_id, request.session.name).then(function(respondida){
      console.log("respondida: ", respondida)
      if(respondida.length>0){
        response.redirect('/estudiante/ingresado'+"?password="+request.session.password)
      }else{
        queries.contestapregunta.buscar_pregunta_realizada_prid(pr_id).then(function(result_pregunta_realizada){

          console.log(result_pregunta_realizada);
          if(result_pregunta_realizada.length>0){
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
              response.render('estudianterealizarpregunta', 
                {
                    nombre:pm_nombre,
                    tipo:pm_tipo,
                    texto:pm_texto,
                    hora_inicio:pr_hora_inicio,
                    hora_fin:pr_hora_fin,
                    tiempo_max:pr_tiempo_max,
                    respuestas:result_respuestas,
                    tv_pr_id:prid,
                    est_id:id_estudiante,
                    codigo: request.session.password
                });
            });
          })
          }else{
            response.redirect('/estudiante/ingresado'+"?password="+request.session.password)
          }

        })
}
})
    });
}