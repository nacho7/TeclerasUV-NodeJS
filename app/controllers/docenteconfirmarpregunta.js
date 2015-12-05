var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  preguntas = require('../queries/preguntas.js'),
  filtro = require('../queries/preguntas.js'),
  clase = require('../queries/clases.js');
  var randomstring = require("randomstring");
module.exports = function(app) {

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/', router);
  //router consulta las preguntas datos dela asignatura
  var code=randomstring.generate(7);   

  router.get('/docente/seleccionar/:idasignatura/:idparalelo', auth_docente, function(request, response, next) {var idprofesor=request.session.name;
    var iddocente=request.session.name;

      // NPM INSTALL RANDOMSTRING!!!!!!!!!!!!!!!!!!!!!!!!!!

      //    clase.clase.insertar_una_clase(code,request.params.idparalelo, request.params.idasignatura,iddocente);
         // console.log(resultado_estudiante);
         
         //cuando llegamos de la lista de ramos, busco si la clase que deberia crear existe, si no existe la creo.
         var flag=0;
         clase.consultas.buscar_una_clase(code,request.params.idparalelo, request.params.idasignatura,iddocente)
         .then(function(clase_res){
              console.log("la clase ya existe????: ",clase_res)
              if(clase_res  != null){
                flag=1;}
                return
         })

        if(flag==0){  // si la clase aun no existe, la agrego a la bd
            clase.consultas.insertar_una_clase(code,request.params.idparalelo, request.params.idasignatura,iddocente)
            .then(function(clase_creada){
               console.log ("la clases esta compuesta por: ",clase_creada)
               //request.session.claseID=id de la clase creada;
               console.log("la id del profe es : ----------------------------------------> " + idprofesor);
              
              preguntas.consultas.buscar_preguntas_asignatura(request.params.idasignatura, request.params.idparalelo, iddocente)
              .then(function(preguntas_res) {
                console.log("Preguntas del ramo/paralelo: ",preguntas_res)
          
                var preguntas = [];
                for(i in preguntas_res){
                    preguntas.push({
                    id: preguntas_res[i].PM_ID,
                    nombre: preguntas_res[i].PM_NOMBRE,
                    tipo: preguntas_res[i].PM_TIPO,
                  })
                }
                console.log("antes del render, asig ->>>>>>>>>>>>>>:"+request.params.idasignatura)
              response.render('docenteseleccionarpregunta', {preguntas: preguntas , 
                idasignatura: request.params.idasignatura, 
                idparalelo: request.params.idparalelo,
                codigo: code });
              })
                      })

        }

    
  });

  
  router.post('/buscarpalabra', function(request, response, next) {  
    var key= request.body.keyword;
    var escondido = request.body.asiidhidden;
    console.log("test hiddennnnnnnnnnnnnn "+ escondido); //texo gigante, o el texto ingresado por el usuario
    console.log("palabra en body es : "+key);
    var iddocente=request.session.name;  
      preguntas.consultas.buscar_preguntas_palabra(key,iddocente)
      .then(function(preguntas_res){
        console.log("los que coinciden son: ", preguntas_res);

        var preguntas = [];
        for(i in preguntas_res){
        preguntas.push({
          id: preguntas_res[i].PM_ID,
          nombre: preguntas_res[i].PM_NOMBRE,
          tipo: preguntas_res[i].PM_TIPO,
        })
      }

        response.render('docenteseleccionarpregunta', {preguntas: preguntas, codigo: code});
     })

      
    });


  router.post('/buscartipo', function(request, response, next) {  
    var tipo= request.body.tipopreg;
 
    console.log("el tipo  es : "+tipo);
    var iddocente=request.session.name;  
      preguntas.consultas.buscar_preguntas_tipo(tipo,iddocente)
      .then(function(preguntas_res){
        console.log("los que coinciden son: ", preguntas_res);

        var preguntas = [];
        for(i in preguntas_res){
        preguntas.push({
          id: preguntas_res[i].PM_ID,
          nombre: preguntas_res[i].PM_NOMBRE,
          tipo: preguntas_res[i].PM_TIPO,
        })
      }
        response.render('docenteseleccionarpregunta', {preguntas: preguntas, codigo: code});
     })
  
    });

  router.post('/buscarfecha', function(request, response, next) {  
    var firstdate= request.body.mindate;
    var lastdate= request.body.maxdate;

 
    console.log("min y max son: "+firstdate+" y "+lastdate);
    var iddocente=request.session.name;  
      preguntas.consultas.buscar_preguntas_fecha(firstdate,lastdate,iddocente)
      .then(function(preguntas_res){
        console.log("los que coinciden son: ", preguntas_res);

        var preguntas = [];
        for(i in preguntas_res){
        preguntas.push({
          id: preguntas_res[i].PM_ID,
          nombre: preguntas_res[i].PM_NOMBRE,
          tipo: preguntas_res[i].PM_TIPO,
        })
      }
        response.render('docenteseleccionarpregunta', {preguntas: preguntas, codigo: code});
     })
  
    });



    router.get('/docente/confirm/:idpregunta', auth_docente, function(request, response, next) {var idprofesor=request.session.name;
    var iddocente=request.session.name;

      
    preguntas.consultas.buscar_preguntas_id(request.params.idpregunta)
    .then(function(preguntas_res) {
      console.log("lo que encontro con la id de la pregunta es :     ",preguntas_res)
      var alphabet = ['a)','b)','c)','d)','e)','f)','g)','h)','i)','j)','k)','l)','m)','n)','o)','p)','q)','r)','s)','t)','u)','v)','w)','x)','y)','z)'];
      var preguntas = [];
      var correcta;
      var tipo;
      var pregid;

      if(preguntas_res!= null){

        if(preguntas_res[0].PM_TIPO=='1'){
          tipo="Alternativas";
        }else if(preguntas_res[0].PM_TIPO=='2'){
          tipo="Dicotómica";
        }else {
          tipo="Escala de Likert";

        }

          for(i in preguntas_res){

          if(preguntas_res[i].PM_CORRECTA == '1'){
            correcta = alphabet[i];
          }

          preguntas.push({
          id: preguntas_res[i].PM_ID,  
          pregtexto: preguntas_res[i].PM_TEXTO,
          nombre: preguntas_res[i].PM_NOMBRE,
          respuesta: preguntas_res[i].RES_TEXTO,
          correcta: preguntas_res[i].PM_CORRECTA,
          tipo: preguntas_res[i].PM_TIPO,
        })
        }
      }


      console.log("antes del render, asig ->>>>>>>>>>>>>>:"+request.params.idpregunta)



    response.render('docenteconfirmarpregunta', {preguntas: preguntas, letras: alphabet, correcta: correcta, tipo: tipo, codigo: code});
    })
  });

  

};
