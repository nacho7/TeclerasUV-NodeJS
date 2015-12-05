var db = require('../models');
var sequelize = require("../models/sequelize.js");
//console.log(db.sequelize);
exports.consultas = {
    buscar_preguntas_asignatura: function(asiid, parid,docid) {
      
      return sequelize
      .query("select PM_ID, PM_NOMBRE, PM_TIPO, PM_FECHA_CREACION from TV_PREGUNTA_MAESTRA where TV_PARALELO_ASI_ID=? and TV_PARALELO_PAR_ID=? and TV_PARALELO_TV_DOCENTE_DOC_ID =?", {replacements: [asiid,parid,docid], type: sequelize.QueryTypes.SELECT} )
    },
    
    buscar_preguntas_palabra: function(palabra,docid) {
      return sequelize
      .query("select PM_ID, PM_NOMBRE, PM_TIPO, PM_FECHA_CREACION from TV_PREGUNTA_MAESTRA where PM_NOMBRE like CONCAT('%',?,'%') and TV_PARALELO_TV_DOCENTE_DOC_ID =?", {replacements: [palabra,docid], type: sequelize.QueryTypes.SELECT} )
    },

    buscar_preguntas_tipo: function(tipo,docid) {
      return sequelize
      .query("select PM_ID, PM_NOMBRE, PM_TIPO, PM_FECHA_CREACION from TV_PREGUNTA_MAESTRA where PM_TIPO=? and TV_PARALELO_TV_DOCENTE_DOC_ID =?", {replacements: [tipo,docid], type: sequelize.QueryTypes.SELECT} )
    },

    buscar_preguntas_fecha: function(mindate,maxdate,docid) {
      return sequelize
      .query("select PM_ID, PM_NOMBRE, PM_TIPO, PM_FECHA_CREACION from TV_PREGUNTA_MAESTRA where PM_FECHA_CREACION > ? and PM_FECHA_CREACION < ? and TV_PARALELO_TV_DOCENTE_DOC_ID =?", {replacements: [mindate,maxdate,docid], type: sequelize.QueryTypes.SELECT} )
    },

     buscar_preguntas_id: function(pregid) {
      return sequelize
      .query("select PM_TEXTO, PM_NOMBRE, RES_TEXTO, PM_CORRECTA, PM_TIPO from TV_PREGUNTA_MAESTRA inner join TV_RESPUESTAS on TV_PREGUNTA_MAESTRA.PM_ID=TV_RESPUESTAS.PM_ID and TV_PREGUNTA_MAESTRA.PM_ID =?", {replacements: [pregid], type: sequelize.QueryTypes.SELECT} )
    },



  
  }