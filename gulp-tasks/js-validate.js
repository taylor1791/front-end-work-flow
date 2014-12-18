//
// Validates the JavaScript to prevent common errors. JSHint is a
// re-implementation of Douglas Crockford's JSLint with the goal of not
// forcing his opnions on the code. A complete list of rules is available on
// [jshint.com](http://www.jshint.com/docs/)

'use strict';

var
  gulp = require( 'gulp' ),
  jshint = require( 'gulp-jshint' ),
  jshintrc = require( 'fs' ).readFileSync( __dirname + '/../.jshintrc' );

gulp.task( 'lint-node', function() {
  var
    files = gulp.files( 'node' ),
    config = JSON.parse( jshintrc );

  config.node = true;

  return gulp.src( files )
    .pipe( jshint( config ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jshint.reporter( 'fail' ) );

} );

gulp.task( 'lint-browser', function() {
  var
    files = gulp.files( 'browser' ),
    config = JSON.parse( jshintrc );

  config.node = true;

  return gulp.src( files )
    .pipe( jshint( config ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jshint.reporter( 'fail' ) );

} );
