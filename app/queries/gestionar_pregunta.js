var db = require('../models');

exports.consultas = {
//TODO 
	insertar_pregunta: function(nombrepregunta, pregunta, tipo, url_video , explicacion, paraleloid, asignaturaid, docenteid) {
    return db.TV_PREGUNTA_MAESTRA
      .build({
        PM_NOMBRE: nombrepregunta,
        PM_TEXTO: pregunta,
        PM_TIPO: tipo,
        PM_RUTA_VIDEO : url_video,
        PM_EXPLICACION : explicacion,
        TV_PARALELO_PAR_ID: paraleloid,
        TV_PARALELO_ASI_ID: asignaturaid,
        TV_PARALELO_TV_DOCENTE_DOC_ID: docenteid
      })
      .save()
  },

  insertar_respuesta: function(respuesta, idpreguntamaestra, correcta) {
    return db.TV_RESPUESTAS
      .build({
        RES_TEXTO: respuesta,
        PM_ID: idpreguntamaestra,
        PM_CORRECTA: correcta,
      })
      .save()
  }
}
