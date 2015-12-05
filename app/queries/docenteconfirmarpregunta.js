var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');

module.exports = function(app){
     var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);
  router.post("/enviarpregunta", auth_docente,function(request, response, next){
    console.log(request.body)
  })
 router.get('/docente/realizar/', auth_docente, function(request, response, next) {
    console.log("id usuario:",request.session.name, "tipo:", request.session.tipo);
    response.render('docenteconfirmarpregunta', {
      codigo:'a',
      preguntas:['q', '2']
    });
  });
}

Guardar pregunta (query)

var db = require('../models');
var sequelize = require("../models/sequelize.js")
//console.log(db.sequelize);
exports.consultas = {
    guarda_pregunta: db.TV_PREGUNTA_REALIZADA.findAll(),
    guardar_unapregunta_admin: function(idpregunta) {
      return db.TV_PREGUNTA_REALIZADA.findOne({
        where: {
          ASI_ID: idpregunta
        }
      })
    },
    guardar_unapregunta: function(idpregunta, hora_ini, hora_fin, tiempo ) {
      return sequelize
      .query("insert into  TV_PREGUNTA_REALIZADA values('PR_ID=?', 'PR_HORA_INICIO=?, 'PR_HORA_FIN=?', 'PR_TIEMPO_MAX", {replacements: [idpregunta, hora_ini], hora_fin, tiempo: sequelize.QueryTypes.SELECT} )
    },
    buscar_asignaturas_profesor: function(docid) {
      return sequelize
      .query("select TV_ASIGNATURA.ASI_ID as ASI_ID, ASI_NOMBRE, ASI_CODIGO, TV_PARALELO.PAR_NUMERO as PAR_NUMERO, TV_PARALELO.TV_DOCENTE_DOC_ID from TV_ASIGNATURA inner join TV_PARALELO on TV_PARALELO.ASI_ID=TV_ASIGNATURA.ASI_ID where TV_PARALELO.TV_DOCENTE_DOC_ID=?", {replacements: [docid], type: sequelize.QueryTypes.SELECT} )
    }
  }

