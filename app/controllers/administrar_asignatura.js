/*Acá va la declaración de variables globales. Los require, como se explicó en el md de Controllers
*/
var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  queries = require('../queries/index.js');

//Siempre un js que se quiera exportar, debe tener el module.exports, significa que todo lo que vaya adentro es lo que se podrá importar usando require. Todo lo que no esté dentro, es "privado" y no se podrá ver desde otro archivo
module.exports = function(app) {
/*bodyParser es para poder usar request.body básicamente y parsear el body y los formularios
app.use es una función de express para "usar" ciertas funcionalidades dentro de express.*/
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);
//Esto es inyección de dependencias, expressjs por defecto trabaja poniendo las rutas en el mismo código, no en un xml o cosas así como en java
/*auth_docente es una función middleware, esto significa que se ejecuta antes que la siguiente, siempre que se llame a next().
Ejemplo: si en la func middleware nunca llamo a next(), termina la ejecución del router, pero si llamo a next(), se ejecutará la siguiente en el router, pueden haber tantas como uno quiera
Recordar: post recibe en request.body*/
  router.get('/admin/administrar_asignatura', auth_docente, function(request, response, next) {
    //queries es un namespace para los archivos de consultas, que inventé yo para no importar tanta cosa xD ver app/queries/index.js
    queries.asignaturas.buscar_una_asignatura_admin(request.query.idasignatura).then(function(asignatura_res) {
      var asignatura;
      console.log(asignatura_res);
      //Este if es para comprobar que no sea null, si es null y hago null.variable, dará error y mostrará un mensaje feito
      if (asignatura_res != null) {
        //Esta parte es para mandar sólo los datos que quiero, si se fijan, el resultado de la consulta es gigante, trae todos los metadatos, así que demoraría más en cargar la página si le llevo al cliente tooodos los datos de la bd, además de ser peligroso D:
       asignatura = {
        id: asignatura_res.dataValues.ASI_ID,
        nombre: asignatura_res.dataValues.ASI_NOMBRE,
        codigo: asignatura_res.dataValues.ASI_CODIGO
      }
      //si es null, le asigno un objeto vacío
    }else{
      asignatura ={};
    }
    /*renderizo la página, el nombre es el mismo del archivo del view
    */
      response.render('administrar_asignatura', {
        /*paso las variables que quiera, y el view las tomará
        */
        asignatura: asignatura
      });
    })
  })
  /*Acá se recibe el resultado del formulario. Si no se pone el auth, entonces cualquiera puede enviar un post mediante ajax D:
  */
  router.post('/admin/administrar_asignatura', auth_docente, function(request, response, next) {
    /*las opciones del radio
    */
    switch (request.body.opcion) {
      case 'volver':
        response.redirect("/docente/menu");
        break;
      case 'modificar':
        queries.updates.actualizar_asignatura(request.body.id, request.body.nombre, request.body.codigo);
        break;
      case 'eliminar':
        queries.deletes.borrar_asignatura_por_id(request.body.id);
        break;
      default:
        console.log("error");
        break;
    }
    /*desde el post nunca podrán hacer un render, sólo redirect. Si quieren pasar variables desde post a get, declárenlas en el post tipo
    mivar=2
     y luego en el get del otro lado las usan simplemente, como si nada,
     ejemplo:
      usando = mivar;*/
    response.redirect("/docente/menu");
  })
}
