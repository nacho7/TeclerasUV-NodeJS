var db = require('../models');
var sequelize1 = require('sequelize');
var sequelize = require("../models/sequelize.js");
//console.log(db.sequelize);
exports.consultas = {
    buscar_preguntas_asignatura: function(asiid, parid,docid) {
      
      return sequelize
      .query("select * from TV_PREGUNTA_MAESTRA where TV_PARALELO_ASI_ID=? and TV_PARALELO_PAR_ID=? and TV_PARALELO_TV_DOCENTE_DOC_ID =?", {replacements: [asiid,parid,docid], type: sequelize.QueryTypes.SELECT} )
    },
    
    buscar_preguntas_palabra: function(palabra,docid,idasig,idpara) {
      return sequelize
      .query("select PM_ID, PM_NOMBRE, PM_TIPO, PM_FECHA_CREACION from TV_PREGUNTA_MAESTRA where PM_NOMBRE like CONCAT('%',?,'%') and TV_PARALELO_TV_DOCENTE_DOC_ID =? and TV_PARALELO_ASI_ID =? and TV_PARALELO_PAR_ID =?", {replacements: [palabra,docid,idasig,idpara], type: sequelize.QueryTypes.SELECT} )
    },

    buscar_preguntas_tipo: function(tipo,docid,idasig,idpara) {
      return sequelize
      .query("select PM_ID, PM_NOMBRE, PM_TIPO, PM_FECHA_CREACION from TV_PREGUNTA_MAESTRA where PM_TIPO=? and TV_PARALELO_TV_DOCENTE_DOC_ID =? and TV_PARALELO_ASI_ID =? and TV_PARALELO_PAR_ID =?", {replacements: [tipo,docid,idasig,idpara], type: sequelize.QueryTypes.SELECT} )
    },

    buscar_preguntas_fecha: function(mindate,maxdate,docid,idasig,idpara) {
      return sequelize
      .query("select PM_ID, PM_NOMBRE, PM_TIPO, PM_FECHA_CREACION from TV_PREGUNTA_MAESTRA where PM_FECHA_CREACION > ? and PM_FECHA_CREACION < ? and TV_PARALELO_TV_DOCENTE_DOC_ID =? and TV_PARALELO_ASI_ID =? and TV_PARALELO_PAR_ID =?", {replacements: [mindate,maxdate,docid,idasig,idpara], type: sequelize.QueryTypes.SELECT} )
    },

     buscar_preguntas_id: function(pregid) {
      return sequelize
      .query("select * from TV_PREGUNTA_MAESTRA inner join TV_RESPUESTAS on TV_PREGUNTA_MAESTRA.PM_ID=TV_RESPUESTAS.PM_ID and TV_PREGUNTA_MAESTRA.PM_ID =?", {replacements: [pregid], type: sequelize.QueryTypes.SELECT} )
    },

    contar_respuestas_id: function(pmid,claid) {
      return sequelize
      .query("select * from TV_PREGUNTA_REALIZADA inner join TV_PREGUNTA_RESPONDIDA on TV_PREGUNTA_REALIZADA.PR_ID=TV_PREGUNTA_RESPONDIDA.PR_ID where PM_ID=? and CLA_ID=? and PR_HORA_FIN is NULL", {replacements: [pmid,claid], type: sequelize.QueryTypes.SELECT} )
    },


    insertar_pregunta_realizada: function(pmid, claid) {
        return db.TV_PREGUNTA_REALIZADA
          .build({
            PR_HORA_INICIO: sequelize1.fn('NOW'), 
            PM_ID: pmid,
            CLA_ID: claid
          })
          .save()
      },

    cerrar_pregunta_realizada: function(pmid,claid) {
      return sequelize
      .query("update TV_PREGUNTA_REALIZADA set PR_HORA_FIN = NOW() where PM_ID=? and CLA_ID=?", {replacements: [pmid,claid], type: sequelize.QueryTypes.UPDATE} )
    }

  
  }