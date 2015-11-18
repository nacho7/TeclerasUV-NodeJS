var queries = {},
  fs = require('fs'),
  path = require('path');
/*Este archivo lo inventé yo para hacer un namespace común a las queries importando este archivo, no explicaré en profundidad qué significa cada cosa
*/
fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var ruta_archivo = path.join(__dirname, file);
  var query = require(ruta_archivo);
  name = file.substr(0, file.lastIndexOf('.'));
  queries[name] = query.consultas;
});


  module.exports = queries;
