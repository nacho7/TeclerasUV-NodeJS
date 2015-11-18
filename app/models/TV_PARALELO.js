/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_PARALELO', {
    PAR_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PAR_NUMERO: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ASI_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_ASIGNATURA',
        key: 'ASI_ID'
      }
    },
    TV_DOCENTE_DOC_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_DOCENTE',
        key: 'DOC_ID'
      }
    }
  });
};
