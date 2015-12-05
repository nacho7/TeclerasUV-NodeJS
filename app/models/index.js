/*Este archivo contiene la definición de la base de datos, y los parámetros generales que usarán todos los modelos*/
var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {},
  sequelize = require('./sequelize.js');

/*Acá se define el objeto de la base de datos, donde los parámetros son:
database, usuario, password, opciones
*/
/*esto crea el namespace común "db"
*/
fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'sequelize.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});
/*esto busca el método associate en los modelos, donde deberían estar las asociaciones, pero el generador no las crea, asi que hay que hacerlas a mano
*/
Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*El generador no crea las asociaciones. Deberían estar en el método associate en los modelos (bajo classMethods), pero los dejé acá por flojera de ponerloa allá, y para que estén todos juntos.
Esto crea asociaciones 1 a muchos.
OJO, Si cambian una columna, o le agregan cosas, o agreguan columnas, o cambian algo en los modelos, entonces cambiará en la bd, así que ojo con eso, que la sobreescribe cada vez (la sincroniza)
*/

db.TV_ESTUDIANTE.hasMany(db.TV_ASISTENCIA_CLASE);
db.TV_CLASE.hasMany(db.TV_ASISTENCIA_CLASE);
db.TV_PARALELO.hasMany(db.TV_CLASE);
db.TV_ASIGNATURA.hasMany(db.TV_PARALELO);
db.TV_DOCENTE.hasMany(db.TV_PARALELO);
db.TV_PARALELO.hasMany(db.TV_PREGUNTA_MAESTRA);
db.TV_PREGUNTA_MAESTRA.hasMany(db.TV_PREGUNTA_REALIZADA);
db.TV_CLASE.hasMany(db.TV_PREGUNTA_REALIZADA);
db.TV_PREGUNTA_REALIZADA.hasMany(db.TV_PREGUNTA_RESPONDIDA);
db.TV_ESTUDIANTE.hasMany(db.TV_PREGUNTA_RESPONDIDA);
db.TV_RESPUESTAS.hasMany(db.TV_PREGUNTA_RESPONDIDA);
db.TV_PREGUNTA_MAESTRA.hasMany(db.TV_RESPUESTAS);

module.exports = db;
