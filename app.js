

var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models');

var app = express();
var createServer = {
  run: function() {
  db.sequelize
	  .sync()
	  .then(function () {
            var io = require('socket.io').listen(app.listen(3000));
            app.io = io;
            
            
            mensajesasincronos(io);
            
	  }).catch(function (e) {
	    throw new Error(e)
  })
},
  miapp: app
};

createServer.run();
require('./config/express')(app, config);
app.use('/public', express.static(__dirname + '/public'));

function mensajesasincronos(io) {
    
    
    
    io.on('connection', function (socket) {
        socket.on('join', function (data) {
            console.log(data);
            if (data.tipo == "estudiante") {
                socket.join("estudiante:" + data.codigo);
            } else if (data.tipo == "docente") {
                socket.join("docente:" + data.codigo);
            }
        });
    });
}

module.exports = createServer;
