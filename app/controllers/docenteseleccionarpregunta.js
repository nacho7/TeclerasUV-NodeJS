var express = require('express'),
  router = express.Router(),
  auth_docente = require("../middleware/auth_docente.js"),
  preguntas = require('../queries/preguntas.js');
  filtro = require('../queries/preguntas.js');
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
  var code=randomstring.generate(4);   
  var clasid;
  var idcla;
  router.get('/docente/seleccionar/:idasignatura/:idparalelo', auth_docente, function(request, response, next) 
    {var idprofesor=request.session.name;
     
     var iddocente=request.session.name;
     var idasig = request.params.idasignatura;
     var idpara = request.params.idparalelo;
    




clase.consultas.insertar_una_clase(code,request.params.idparalelo, request.params.idasignatura,iddocente)
.then(function(insertado){

//busco si existe una clase con el codigo ya creada, si existe no la creo
     clase.consultas.buscar_clases()
     .then(function(clase_res){
      //console.log("hmmmmm ",clase_res)  // 


      for(i in clase_res){

          //console.log("voy a comparar : "+clase_res[i].CLA_PASSWORD+" con : "+ code)
          if(clase_res[i].CLA_PASSWORD == code){
            console.log("encontre uno igual!!")
            idcla = clase_res[i].CLA_ID;
          }
            
        }

      console.log("-------------------------------- :"+ idcla)
     })


preguntas.consultas.buscar_preguntas_asignatura(request.params.idasignatura, request.params.idparalelo, iddocente)
    .then(function(preguntas_res) {
      console.log("Preguntas del ramo/paralelo: ",preguntas_res)

      var preguntas = [];


      for(i in preguntas_res){
          console.log("lo que tiene en imagen es"+ preguntas_res[i].PM_RUTA_IMAGEN)
          preguntas.push({
          id: preguntas_res[i].PM_ID,
          nombre: preguntas_res[i].PM_NOMBRE,
          tipo: preguntas_res[i].PM_TIPO,
          imagen: preguntas_res[i].PM_RUTA_IMAGEN,
          video: preguntas_res[i].PM_RUTA_VIDEO,
          imagenxexplicacion : preguntas_res[i].PM_RUTA_IMAGEN_EXPLICACION
        })
      }
      console.log("antes del render, clase id "+ idcla)

    request.session.codigoclase = code;
    response.render('docenteseleccionarpregunta', {
      preguntas: preguntas , 
      idasig: idasig,
      idpara: idpara,
      codigo: code,
      idclase: idcla });
    })



}); 
 

  });

  
  router.post('/buscarpalabra', function(request, response, next) {  
    var key= request.body.keyword;
    var idasig_hidden = request.body.idasig;
    var idpara_hidden = request.body.idpara;
    var idcla_hidden = request.body.idcla;
    //console.log("test hiddennnnnnnnnnnnnn "+ escondido); 
    console.log("palabra en body es : "+key);
    var iddocente=request.session.name;  
      preguntas.consultas.buscar_preguntas_palabra(key,iddocente,idasig_hidden, idpara_hidden)
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

        response.render('docenteseleccionarpregunta', {
          preguntas: preguntas,
          codigo: code,
          idasig: idasig_hidden,
          idpara: idpara_hidden,
          idclase: idcla_hidden});
     })

      
    });


  router.post('/buscartipo', function(request, response, next) {  
    var tipo= request.body.tipopreg;
    var idasig_hidden = request.body.idasig;
    var idpara_hidden = request.body.idpara;
    var idcla_hidden = request.body.idcla;

    console.log("el tipo  es : "+tipo);
    var iddocente=request.session.name;  
      preguntas.consultas.buscar_preguntas_tipo(tipo,iddocente,idasig_hidden,idpara_hidden)
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
        response.render('docenteseleccionarpregunta', {
          preguntas: preguntas,
          codigo: code,
          idasig: idasig_hidden,
          idpara: idpara_hidden,
          idclase: idcla_hidden});
     })
  
    });

  router.post('/buscarfecha', function(request, response, next) {  
    var firstdate= request.body.mindate;
    var lastdate= request.body.maxdate;
    var idasig_hidden = request.body.idasig;
    var idpara_hidden = request.body.idpara;
    var idcla_hidden = request.body.idcla;
 
    console.log("min y max son: "+firstdate+" y "+lastdate);
    var iddocente=request.session.name;  
      preguntas.consultas.buscar_preguntas_fecha(firstdate,lastdate,iddocente,idasig_hidden, idpara_hidden)
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
        response.render('docenteseleccionarpregunta', {
          preguntas: preguntas,
          codigo: code,
          idasig: idasig_hidden,
          idpara: idpara_hidden,
          idclase: idcla_hidden});
     })
  
    });



    router.get('/docente/confirm/:idpregunta/:idclase/:idasig/:idpara', auth_docente, function(request, response, next) {var idprofesor=request.session.name;
    var iddocente=request.session.name;

      
    preguntas.consultas.buscar_preguntas_id(request.params.idpregunta)
    .then(function(preguntas_res) {
      console.log("lo que encontro con la id de la pregunta es :     ",preguntas_res)
      //xD!!!!!!!
      var alphabet = ['a)','b)','c)','d)','e)','f)','g)','h)','i)','j)','k)','l)','m)','n)','o)','p)','q)','r)','s)','t)','u)','v)','w)','x)','y)','z)'];
      var preguntas = [];
      var correcta;
      var tipo;
      var pregid = request.params.idpregunta;

      if(preguntas_res!= null){

        if(preguntas_res[0].PM_TIPO=='1'){
          tipo="Alternativas";
        }else if(preguntas_res[0].PM_TIPO=='2'){
          tipo="Dicotómica";
        }else {
          tipo="Escala de Likert";

        }

        var imagen = preguntas_res[0].PM_RUTA_IMAGEN;
        var video= preguntas_res[0].PM_RUTA_VIDEO;
        console.log("WHAAAAAAAAAAAAAAAAAAAAAT--->"+imagen)
          for(i in preguntas_res){

          if(preguntas_res[i].PM_CORRECTA == '1'){
            correcta = alphabet[i];
          }

          preguntas.push({
          pmid: preguntas_res[i].PM_ID,  
          pregtexto: preguntas_res[i].PM_TEXTO,
          nombre: preguntas_res[i].PM_NOMBRE,
          respuesta: preguntas_res[i].RES_TEXTO,
          correcta: preguntas_res[i].PM_CORRECTA,
          tipo: preguntas_res[i].PM_TIPO,
          imagen: preguntas_res[i].PM_RUTA_IMAGEN,
          video: preguntas_res[i].PM_RUTA_VIDEO
        })
        }
      }


      console.log("antes del render, asig ->>>>>>>>>>>>>>:"+request.params.idpregunta)

    

            response.render('docenteconfirmarpregunta', {
                preguntas: preguntas,
                letras: alphabet, 
                correcta: correcta, 
                tipo: tipo, 
                codigo: code,
                pregid: pregid,
                clasid: clasid,
                idasig : request.params.idasig,
                idpara : request.params.idpara,
                idclase: request.params.idclase,
                imagen,
                video});
    })
  });

   
    



};