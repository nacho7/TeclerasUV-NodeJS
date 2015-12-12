var db = require('../models');
var sequelize = require("../models/sequelize.js")
//console.log(db.sequelize);
exports.consultas = {
    buscar_asignaturas: db.TV_ASIGNATURA.findAll(),
    buscar_una_asignatura_admin: function(idasignatura) {
      return db.TV_ASIGNATURA.findOne({
        where: {
          ASI_ID: idasignatura
        }
      })
    },
    buscar_una_asignatura: function(asignaturaid, paraleloid) {
      return sequelize
      .query("select TV_ASIGNATURA.ASI_ID as ASI_ID, ASI_NOMBRE, ASI_CODIGO, TV_PARALELO.PAR_NUMERO as PAR_NUMERO, TV_PARALELO.TV_DOCENTE_DOC_ID, TV_PARALELO.PAR_ID as PAR_ID from TV_ASIGNATURA inner join TV_PARALELO on TV_PARALELO.ASI_ID=TV_ASIGNATURA.ASI_ID where TV_ASIGNATURA.ASI_ID=? and TV_PARALELO.PAR_NUMERO=?", {replacements: [asignaturaid, paraleloid], type: sequelize.QueryTypes.SELECT} )
    },
    buscar_asignaturas_profesor: function(docid) {
      return sequelize
      .query("select TV_ASIGNATURA.ASI_ID as ASI_ID, ASI_NOMBRE, ASI_CODIGO, TV_PARALELO.PAR_NUMERO as PAR_NUMERO, TV_PARALELO.TV_DOCENTE_DOC_ID, TV_PARALELO.PAR_ID as PAR_ID from TV_ASIGNATURA inner join TV_PARALELO on TV_PARALELO.ASI_ID=TV_ASIGNATURA.ASI_ID where TV_PARALELO.TV_DOCENTE_DOC_ID=?", {replacements: [docid], type: sequelize.QueryTypes.SELECT} )
    }
  }
