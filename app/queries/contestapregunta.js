var db = require('../models');
var sequelize = require("../models/sequelize.js")
//console.log(db.sequelize);
exports.consultas = {
    buscar_pregunta_realizada_prid: function(prid) {
      return sequelize
      .query("select * from TV_PREGUNTA_REALIZADA where PR_ID=?", {replacements: [prid], type: sequelize.QueryTypes.SELECT} )
    },
    buscar_pregunta_maestra_pmid: function(pmid) {
      return sequelize
      .query("select * from TV_PREGUNTA_MAESTRA where PM_ID=?", {replacements: [pmid], type: sequelize.QueryTypes.SELECT} )
    },
    buscar_respuestas_pmid: function(pmid) {
      return sequelize
      .query("select * from TV_RESPUESTAS where PM_ID=?", {replacements: [pmid], type: sequelize.QueryTypes.SELECT} )
    },
    insertar_pregunta_respondida: function(pr_id, est_id,res_id,pres_likert) {
      return db.TV_PREGUNTA_RESPONDIDA
        .build({
          PR_ID: pr_id,
          EST_ID: est_id,
          RES_ID: res_id,
          PRES_LIKERT: pres_likert
        })
        .save()
    }
  }
