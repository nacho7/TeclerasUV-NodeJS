var db = require('../models');
var sequelize = require("../models/sequelize.js")
//console.log(db.sequelize);
exports.consultas = {
    buscar_clase_password: function(codigo) {
      return sequelize
      .query("select * from TV_CLASE where CLA_PASSWORD=?", {replacements: [codigo], type: sequelize.QueryTypes.SELECT} )
    },
    insertar_asistencia: function(id_estudiante, id_clase) {
      return db.TV_ASISTENCIA_CLASE
        .build({
          EST_ID: id_estudiante,
          CLA_ID: id_clase
        })
        .save()
    },
    buscar_pregunta_realizada: function (claid){
        return sequelize
    .query("select PR_ID, PM_ID, CLA_ID FROM TV_PREGUNTA_REALIZADA where CLA_ID=? and PR_HORA_FIN is null", {replacements: [claid], type: sequelize.QueryTypes.SELECT})
    },
    buscar_asistencia: function (id_estudiante, id_clase) {
        return sequelize
    .query("SELECT EST_ID, CLA_ID FROM TV_ASISTENCIA_CLASE WHERE EST_ID=? AND CLA_ID=?", { replacements: [id_estudiante, id_clase], type: sequelize.QueryTypes.SELECT })
     }
  }
  //mñé
