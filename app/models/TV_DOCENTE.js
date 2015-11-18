/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_DOCENTE', {
    DOC_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DOC_CORREO: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    DOC_NOMBRE: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DOC_PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
