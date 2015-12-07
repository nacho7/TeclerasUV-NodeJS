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
    }
  }
