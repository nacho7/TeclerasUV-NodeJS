/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_CLASE', {
    CLA_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CLA_PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CLA_FECHA_HORA_INICIO: {
      type: DataTypes.DATE,
      allowNull: false
    },
    PAR_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PARALELO',
        key: 'PAR_ID'
      }
    },
    ASI_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PARALELO',
        key: 'ASI_ID'
      }
    },
    DOC_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PARALELO',
        key: 'TV_DOCENTE_DOC_ID'
      }
    }
  });
};
