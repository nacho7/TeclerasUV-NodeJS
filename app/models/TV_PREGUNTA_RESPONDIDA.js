/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TV_PREGUNTA_RESPONDIDA', {
    PRES_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PR_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_PREGUNTA_REALIZADA',
        key: 'PR_ID'
      }
    },
    EST_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'TV_ESTUDIANTE',
        key: 'EST_ID'
      }
    },
    RES_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'TV_RESPUESTAS',
        key: 'RES_ID'
      }
    },
    PRES_LIKERT: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
