var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  analizar_docente = require('../queries/analizar_docente.js');

module.exports = function (app) {
    
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use('/', router);
    
    router.get('/docente/analizar/seleccionarfecha/:idasignatura/:idparalelo', auth_docente, function (request, response, next) {
        analizar_docente.consultas.encontrar_preguntas(request.session.name, request.params.idparalelo, request.params.idasignatura).then(function (preguntasres) {
            console.log(preguntasres);
            var pregfechas = [];
            
            for (i in preguntasres) {
                var segundos;
                if (preguntasres[i].PR_HORA_INICIO.getUTCSeconds().toString().length == 1) {
                    segundos = preguntasres[i].PR_HORA_INICIO.getUTCSeconds() + "0";
                }
                else {
                    segundos = preguntasres[i].PR_HORA_INICIO.getUTCSeconds();
                }
                var mes = parseInt(preguntasres[i].PR_HORA_INICIO.getUTCMonth()) + 1;
                pregfechas.push({
                    fechavalue: preguntasres[i].PR_HORA_INICIO.getUTCFullYear() + "-" + mes + "-" + preguntasres[i].PR_HORA_INICIO.getUTCDate() + " " + preguntasres[i].PR_HORA_INICIO.getUTCHours() + ":" + preguntasres[i].PR_HORA_INICIO.getUTCMinutes() + ":" + segundos,
                    fechainicioTotal: preguntasres[i].PR_HORA_INICIO
                })
            }
            console.log(pregfechas);
            response.render('docenteanalizarseleccionarfecha', {
                fechas: pregfechas, 
                idasignatura: request.params.idasignatura,
                idparalelo: request.params.idparalelo
            });
        })
    });
    
    router.get('/docente/analizar/seleccionarpregunta', auth_docente, function (request, response, next) {
        console.log(request.query);
        analizar_docente.consultas.encontrar_preguntas_de_fecha(request.session.name, request.query.paralelo, request.query.asignatura, request.query.fecha).then(function (respreguntas) {
            console.log(respreguntas);
            var preguntas = [];
            for (i in respreguntas) {
                preguntas.push({
                    idpregunta: respreguntas[i].PR_ID,
                    nombre: respreguntas[i].PM_NOMBRE
                })
            }
            response.render('docenteanalizarseleccionarpregunta', {
                preguntas: preguntas,
                idasignatura: request.query.asignatura,
                idparalelo: request.query.paralelo
            });
        })
    
    });
    
    router.get('/docente/analizar/verrespuestas', auth_docente, function (request, response, next) {
        analizar_docente.consultas.encontrar_datos_pregunta(request.session.name, request.query.paralelo, request.query.asignatura, request.query.pregunta).then(function (respregunta) {
            analizar_docente.consultas.encontrar_respuestas(request.query.pregunta).then(function (respuestasres){

            
            console.log(respregunta);
            switch (respregunta[0].PM_TIPO) {
                case '1': console.log("alternativa");
                    mostrar_alternativaodicotomica(respregunta, respuestasres);
                    break
                case '2': console.log("dicotomica");
                    mostrar_alternativaodicotomica(respregunta, respuestasres);
                    break
                case '3': console.log("likert");
                    mostrar_likert(respregunta, respuestasres);
                    break
            }
            })
        })
        function mostrar_alternativaodicotomica(datospregunta, datosrespondidas) {
            var respuestas_respondidas=[];
            for (i in datosrespondidas) {
                respuestas_respondidas.push(datosrespondidas[i].texto);
            }
            var cantidad_por_respuesta = {};
            respuestas_respondidas.forEach(function (x) { cantidad_por_respuesta[x] = (cantidad_por_respuesta[x] || 0) + 1; });
            var respuestas = [];
            for (i in datospregunta) {
                if (datospregunta[i].PM_CORRECTA == '1') {
                    var correcta = datospregunta[i].RES_TEXTO;
                }
                respuestas.push(datospregunta[i].RES_TEXTO);
            }
            var pregunta = {
    asignatura_nombre: datospregunta[0].ASI_NOMBRE,
    asignatura_codigo: datospregunta[0].ASI_CODIGO,
    paralelo: datospregunta[0].PAR_NUMERO,
    nombre: datospregunta[0].PM_NOMBRE,
    texto: datospregunta[0].TEXTO,
    ruta_imagen: datospregunta[0].PM_RUTA_IMAGEN,
    ruta_video: datospregunta[0].PM_RUTA_VIDEO,
    explicacion: datospregunta[0].PM_EXPLICACION,
    explicacion_imagen: datospregunta[0].PM_RUTA_IMAGEN_EXPLICACION,
    pregunta_hora: datospregunta[0].PR_HORA_INICIO,
    clase_hora: datospregunta[0].CLA_FECHA_HORA_INICIO,
                respuestas: respuestas,
                respuesta_correcta: correcta,
    cantidad_por_respuesta: cantidad_por_respuesta
            }
            response.render('docenteanalizarverrespuestasalternativaodictomica', {
            pregunta: pregunta
            });
        }
        function mostrar_likert(datospregunta, datosrespondidas){
            var respuestas_respondidas = [];
            for (i in datosrespondidas) {
                respuestas_respondidas.push(datosrespondidas[i].respondida);
            }
            var cantidad_por_respuesta = {};
            respuestas_respondidas.forEach(function (x) { cantidad_por_respuesta[x] = (cantidad_por_respuesta[x] || 0) + 1; });
            var pregunta = {
                asignatura_nombre: datospregunta[0].ASI_NOMBRE,
                asignatura_codigo: datospregunta[0].ASI_CODIGO,
                paralelo: datospregunta[0].PAR_NUMERO,
                nombre: datospregunta[0].PM_NOMBRE,
                texto: datospregunta[0].TEXTO,
                pregunta_hora: datospregunta[0].PR_HORA_INICIO,
                clase_hora: datospregunta[0].CLA_FECHA_HORA_INICIO,
                cantidad_por_respuesta: cantidad_por_respuesta
            }
            response.render('docenteanalizarverrespuestaslikert', {
                pregunta: pregunta
            });
        }
    
  });

}
