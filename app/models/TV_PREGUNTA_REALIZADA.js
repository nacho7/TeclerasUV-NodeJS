/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_PREGUNTA_REALIZADA', {
    PR_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PR_HORA_INICIO: {
      type: DataTypes.DATE,
      allowNull: false
    },
    PR_HORA_FIN: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PR_TIEMPO_MAX: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PM_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PREGUNTA_MAESTRA',
        key: 'PM_ID'
      }
    },
    CLA_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_CLASE',
        key: 'CLA_ID'
      }
    }
  });
};
