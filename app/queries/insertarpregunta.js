var db = require('../models');

exports.consultas = {
  insertar_pregunta: function(tiempo,preMaestra, clase) {
    return db.TV_PREGUNTA_REALIZADA
      .build({
      	PR_HORA_INICIO: sequelize1.fn('NOW'),
        
      	PR_TIEMPO_MAX: tiempo,
      	PM_ID: preMaestra,
      	CLA_ID: clase
      })
      .save()
  }
}


