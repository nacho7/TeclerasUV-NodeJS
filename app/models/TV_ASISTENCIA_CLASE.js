/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_ASISTENCIA_CLASE', {
    AC_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EST_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_ESTUDIANTE',
        key: 'EST_ID'
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
