/*Actualmente este test no funciona*/

var tasks = Object.keys(require('gulp').tasks),
  connect = require('gulp-connect'),
  port = 3000,
  server = require('./app.js'),
	request = require('supertest'),
  should = require('should');
  //request = require('superagent'),
  //expect = require('chai').expect;
//console.log(expect);
//var app;
var Cookies;
//app = server();
//console.log(app);
//console.log(server);
var miserver;
server.run();
var app = server.miapp;
//console.log(tasks);

describe('Functional Test <Sessions>:', function () {
  it('should create user session for valid user', function (done) {
		this.timeout(5000);
    setTimeout(done, 5000);
    request(app)
      .post('localhost:3000/login')
      .set('Accept','application/json')
      .send({"rut": "18104510", "contrasena": "teclerasuv"})
      .expect('Content-Type', /json/)
      .expect(200, done)
      .end(function (err, res) {
				if(err){return done(err)};
        //res.body.id.should.equal('1');
        //res.body.short_name.should.equal('Test user');
        //res.body.email.should.equal('user_test@example.com');
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  it('should get user session for current user', function (done) {
		this.timeout(5000);
    setTimeout(done, 5000);
    var req = request(app).get('localhost:3000/menu');
    // Set cookie to get saved user session
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        //res.body.id.should.equal('1');
        //res.body.short_name.should.equal('Test user');
        //res.body.email.should.equal('user_test@example.com');
				if(err){return done(err)};
        done();
      });
  });
	after(function() {
    app.close();
  });
});

/*


describe('test/', function() {

  it('should homepage respond to GET', function(done) {
    this.timeout(20000);
    setTimeout(done, 20000);
    request
      .get('http://localhost:3000')
      .end(function(err, res) {
        console.log("termino /");
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        console.log("lo logramos /");
        done();
      })

  })
  after(function() {
    console.log("cerrando");
    return
    app.close();
  });
});
describe('testcompleto', function() {
  it('should send user and pass', function(done) {
    this.timeout(20000);
    setTimeout(done, 20000);
    request
      .post('http://localhost:3000/login')
      .send({
        rut: '18104510',
        contrasena: "teclerasuv"
      })
      .end(function(err, res) {
        console.log("termino de enviar post");
        expect(res).to.exist;
        expect(res.status).to.equal(200);
        console.log("lo logramos send user");
        done();

      })

  })
  after(function() {
    console.log("cerrando");
    return
    app.close();
  });
});*/
