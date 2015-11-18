var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  mocha = require('gulp-mocha'),
  spawn = require('child_process').spawn,
  node;


/*al ejecutar "gulp" a secas, se ejecuta la tarea default, de lo contrario hay que ejecutar
gulp tarea, ejemplo:
gulp server
*/

/*Test mocha, este task puede ejecutarse asíncronamente (al mismo tiempo), ya que no depende de nadia
 */
gulp.task('test', function() {

  return gulp.src('test.js', {
      read: false
    })
    .pipe(mocha({
      reporter: 'nyan'
    }))
    .once('end', function() {
      process.exit();
    });

});



/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['app.js'], {
    stdio: 'inherit'
  })
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', ['server'], function() {
  //gulp.run('server')

  gulp.watch(['./app.js', './app/**/*', 'config/*.js', './package.json'], ['server'])

  // Need to watch for sass changes too? Just add another watch call!
  // no more messing around with grunt-concurrent or the like. Gulp is
  // async by default.
})

gulp.task('parar', function(){
  if (node) node.kill()
})
// clean up if an error goes unhandled.
process.on('exit', function() {
  if (node) node.kill()
})

module.exports = gulp;
