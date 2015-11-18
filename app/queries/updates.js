var db = require('../models');

exports.consultas = {
  actualizar_asignatura: function(id, nombre, codigo) {
    return db.TV_ASIGNATURA.update(
      {
        ASI_NOMBRE : nombre,
        ASI_CODIGO : codigo
      },{
        where: {
          ASI_ID: id
        }
      }).then(function(resultado){
        console.log(resultado);
      })
  /*  return db.TV_ASIGNATURA.findOne({
      where: {
        ASI_ID: id
      }
    }).then(function(asignatura) {
      asignatura.ASI_NOMBRE = nombre;
      asignatura.ASI_CODIGO = codigo;
      console.log(asignatura);

      asignatura.reload().then(function() {
        console.log(asignatura);
      })
    })*/
  }
}
