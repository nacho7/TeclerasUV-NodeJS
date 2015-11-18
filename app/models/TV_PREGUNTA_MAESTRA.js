/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_PREGUNTA_MAESTRA', {
    PM_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PM_NOMBRE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PM_TEXTO: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PM_TIPO: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PM_FECHA_CREACION: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PM_RUTA_IMAGEN: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PM_RUTA_VIDEO: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PM_EXPLICACION: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PM_RUTA_IMAGEN_EXPLICACION: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TV_PARALELO_PAR_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PARALELO',
        key: 'PAR_ID'
      }
    },
    TV_PARALELO_ASI_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PARALELO',
        key: 'ASI_ID'
      }
    },
    TV_PARALELO_TV_DOCENTE_DOC_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PARALELO',
        key: 'TV_DOCENTE_DOC_ID'
      }
    }
  });
};
