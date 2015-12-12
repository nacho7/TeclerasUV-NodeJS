var express = require('express'),
    router = express.Router(),
    auth_estudiante = require("../middleware/auth_estudiante.js"),
    queries = require('../queries/index.js');

module.exports = function (app) {
    
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use('/', router);
    
    router.get('/estudiante/realizarpregunta/:pmid/:prid', auth_estudiante, function (request, response, next) {
        response.render('estudianterealizarpregunta', {
            pmid: request.params.pmid,
            prid: request.params.prid
        });
    });
}