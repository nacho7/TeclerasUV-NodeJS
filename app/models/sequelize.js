/*Este archivo contiene la definición de la base de datos, y los parámetros generales que usarán todos los modelos*/
var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {};

/*Acá se define el objeto de la base de datos, donde los parámetros son:
database, usuario, password, opciones
*/
var sequelize = new Sequelize('teclerasuv', 'teclerasuv', 'desarrolloweb', {

  host: 'localhost',
  dialect: 'mysql',
  autoIncrement: true,
  pool: {
    /*Estas son las conexiones máximas, mínimas, y el tiempo de espera máximo, si da error timeout, le suben el idle :v yo le subi el min para que espere que haya al menos una conexión
    */
    max: 50,
    min: 0,
    idle: 10
  },
  define: {
    /*esto crea columnas de timestamp, es decir, cuándo se creó la fila, cuándo se actualizó por última vez. para desactivar eso, ponerlo en false
    */
        timestamps: false,
        /*esto es debido a que sequelize  es muy estricto con que se debe tener una bd estandarizada, con los nombres de las tablas todos terminados en s, entonces si tus tablas no terminan todas en s, entonces pon esto
        */
        freezeTableName: true,
        /*esto es para las columnas, a sequelize le gusta que todas estén en camelCase, o en under_score, no mezcladas, si las tienes mezcladas se hace un lío, no lo recomiendo... volás del ORM
        */
  }

})
sequelize.sync({
})

module.exports=sequelize;