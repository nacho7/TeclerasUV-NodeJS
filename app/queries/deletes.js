var db = require('../models');

exports.consultas = {
    borrar_asignatura_por_id: function(id) {
        return db.TV_ASIGNATURA.destroy({
              where: {
                ASI_ID: id
              }
            })
          },
          borrar_asignatura_tranfugamente: function(id) {
            return db.TV_ASIGNATURA.destroy({
                where: {
                  or: [{
                      ASI_ID: id
                    }, {
                      ASI_NOMBRE: {
                        $like: 'a%'
                      }
                    }]
                  }
                })
              }
            }
