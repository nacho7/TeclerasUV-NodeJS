var db = require('../models');

exports.consultas = {
  insertar_asignatura: function(nombre, codigo) {
    return db.TV_ASIGNATURA
      .build({
        ASI_CODIGO: codigo,
        ASI_NOMBRE: nombre
      })
      .save()
      .then(function(anotherTask) {
        // you can now access the currently saved task with the variable anotherTask... nice!
        console.log(anotherTask);
      })
  }
}
