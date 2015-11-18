/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_ESTUDIANTE', {
    EST_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    EST_CORREO: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    EST_NOMBRE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EST_PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
