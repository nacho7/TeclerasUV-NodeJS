var db = require('../models');

exports.consultas = {
  insertar_asignatura: function(nombre, codigo) {
    return db.TV_ASIGNATURA
      .build({
        ASI_CODIGO: codigo,
        ASI_NOMBRE: nombre
      })
      .save()
  }
}
