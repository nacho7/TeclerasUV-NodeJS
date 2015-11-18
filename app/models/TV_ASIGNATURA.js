/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_ASIGNATURA', {
    ASI_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ASI_CODIGO: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ASI_NOMBRE: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
