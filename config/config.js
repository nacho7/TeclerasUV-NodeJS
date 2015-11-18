var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

//port:3000
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'farmautomatico'
    },
    port: 3000,
    db: 'jdbc:mysql://localhost:3306/farmautomatico',
    palabra_secreta: "teclerasuv"
  },

  test: {
    root: rootPath,
    app: {
      name: 'farmautomatico'
    },
    port: 3000,
    db: 'mysql://localhost/farmautomatico-test',
    palabra_secreta: "teclerasuv"
  },

  production: {
    root: rootPath,
    app: {
      name: 'farmautomatico'
    },
    port: 3000,
    db: 'mysql://localhost/farmautomatico-production',
    palabra_secreta: "teclerasuv"
  }
};

module.exports = config[env];
