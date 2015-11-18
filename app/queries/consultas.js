var db = require('../models');

exports.consultas = {
    buscar_asignaturas: db.TV_ASIGNATURA.findAll(),
    buscar_una_asignatura: function(id) {
      return db.TV_ASIGNATURA.findOne({
        where: {
          ASI_ID: id
        }
      })
    }
  }
