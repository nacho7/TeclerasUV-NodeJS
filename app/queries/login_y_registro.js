var db = require('../models');

exports.consultas = {
  buscar_estudiantes: db.TV_ESTUDIANTE.findAll({
    attributes: ['EST_ID', 'EST_CORREO', 'EST_NOMBRE', 'EST_PASSWORD']
  }),
  insertar_un_estudiante: function(nombre, correo, contrasena) {
    return db.TV_ESTUDIANTE
      .build({
        EST_NOMBRE: nombre,
        EST_CORREO: correo,
        EST_PASSWORD: contrasena
      })
      .save()
  },
  buscar_docentes: db.TV_DOCENTE.findAll(),
  insertar_un_docente: function(nombre, correo, contrasena) {
    return db.TV_DOCENTE
      .build({
        DOC_NOMBRE: nombre,
        DOC_CORREO: correo,
        DOC_PASSWORD: contrasena
      })
      .save()
  }
}
