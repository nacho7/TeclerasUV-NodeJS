/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_RESPUESTAS', {
    RES_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    RES_TEXTO: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PM_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PREGUNTA_MAESTRA',
        key: 'PM_ID'
      }
    },
    PM_CORRECTA: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
