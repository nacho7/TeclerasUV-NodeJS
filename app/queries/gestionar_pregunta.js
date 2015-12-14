var db = require('../models');
var sequelize = require("../models/sequelize.js");

exports.consultas = {
//TODO 
	insertar_pregunta: function(nombrepregunta, pregunta, tipo, url_video ,ruta_imagen, explicacion, paraleloid, asignaturaid, docenteid) {
    return db.TV_PREGUNTA_MAESTRA
      .build({
        PM_NOMBRE: nombrepregunta,
        PM_TEXTO: pregunta,
        PM_TIPO: tipo,
        PM_RUTA_VIDEO : url_video,
        PM_RUTA_IMAGEN : ruta_imagen,
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
  },

   buscar_preguntas_profesor: function(docid, asignaturaid, paraleloid, tipo) {
      return sequelize
      .query("select TV_PREGUNTA_MAESTRA.PM_ID as PM_ID, PM_NOMBRE, PM_TEXTO, PM_EXPLICACION, PM_TIPO,TV_PARALELO_PAR_ID, TV_PARALELO_ASI_ID, TV_PARALELO_TV_DOCENTE_DOC_ID  from TV_PREGUNTA_MAESTRA inner join TV_DOCENTE on TV_DOCENTE.DOC_ID=TV_PARALELO_TV_DOCENTE_DOC_ID where TV_PARALELO_TV_DOCENTE_DOC_ID=? and TV_PARALELO_PAR_ID=? and  TV_PARALELO_ASI_ID=? and PM_TIPO=?", {replacements: [docid, paraleloid, asignaturaid, tipo], type: sequelize.QueryTypes.SELECT} )
 
},
 actualizar_pregunta: function(id, nombrepregunta,pregunta, url_video ,ruta_imagen, explicacion) {
    return db.TV_PREGUNTA_MAESTRA.update(
      {
        PM_NOMBRE: nombrepregunta,
        PM_TEXTO: pregunta,
        PM_RUTA_VIDEO : url_video,
        PM_RUTA_IMAGEN : ruta_imagen,
        PM_EXPLICACION : explicacion,
      },{
        where: {
          PM_ID: id
        }
      }).then(function(resultado){
        console.log("actualizado pregunta",resultado);
      })
  },
  buscar_pregunta: function(preguntaid){

    return sequelize
      .query("PM_ID, PM_NOMBRE, PM_TEXTO, PM_EXPLICACION, PM_RUTA_VIDEO,PM_RUTA_IMAGEN, PM_TIPO,TV_PARALELO_PAR_ID, TV_PARALELO_ASI_ID, TV_PARALELO_TV_DOCENTE_DOC_ID  from TV_PREGUNTA_MAESTRA where PM_ID=?", {replacements: [preguntaid], type: sequelize.QueryTypes.SELECT} )
  },
  buscar_respuesta: function(respuestaid){

    return sequelize
      .query("select PM_ID, RES_TEXTO, PM_CORRECTA from TV_RESPUESTAS where PM_ID=?", {replacements: [respuestaid], type: sequelize.QueryTypes.SELECT} )
  },
  eliminar_pregunta: function(preguntaid){
     return db.TV_PREGUNTA_MAESTRA.destroy({
              where: {
                PM_ID: preguntaid
              }
            })
  },
  eliminar_respuesta: function(preguntaid){
     return db.TV_RESPUESTAS.destroy({
              where: {
                PM_ID: preguntaid
              }
            }).then(function(resultado){
        console.log("eliminar respuesta",resultado);
      })
  },
  eliminar_pregunta_respondida: function(preguntarespondidaid){
     return db.TV_PREGUNTA_RESPONDIDA.destroy({
              where: {
                PR_ID: preguntarespondidaid
              }
            })
  },
  eliminar_pregunta_respondida_pm_id: function(preguntaid){
     return db.TV_PREGUNTA_RESPONDIDA.destroy({
              where: {
                PM_ID: preguntaid
              }
            })
  },
  eliminar_pregunta_realizada: function(preguntarealizadaid){
       return db.TV_PREGUNTA_REALIZADA.destroy({
              where: {
                PR_ID: preguntaid
              }
            })
  },
  eliminar_pregunta_realizada_pm_id: function(preguntamaestraid){
         return db.TV_PREGUNTA_REALIZADA.destroy({
              where: {
                PM_ID: preguntaid
              }
            })
  }

}
