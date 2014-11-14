//
// Validates the JavaScript to prevent common errors. JSHint is a
// re-implementation of Douglas Crockford's JSLint with the goal of not
// forcing his opnions on the code. A complete list of rules is available on
// [jshint.com](http://www.jshint.com/docs/)

var
  gulp = require( 'gulp' ),
  jshint = require( 'gulp-jshint' );

gulp.task( 'lint-node', function() {
  var files = gulp.files( 'node' );

  return gulp.src( files )
    .pipe( jshint( {
      node: true
    } ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jshint.reporter( 'fail' ) );

} );

gulp.task( 'lint-browser', function() {
  var files = gulp.files( 'browser' );

  return gulp.src( files )
    .pipe( jshint( {
      browser: true
    } ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jshint.reporter( 'fail' ) );

} );
