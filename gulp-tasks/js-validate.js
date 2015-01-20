//
// Validates the JavaScript to prevent common errors. JSHint is a
// re-implementation of Douglas Crockford's JSLint with the goal of not
// forcing his opnions on the code. A complete list of rules is available on
// [jshint.com](http://www.jshint.com/docs/)

'use strict';

var
  gulp = require( 'gulp' ),
  fewu = require( './setup' ),

  getConfig = function() {
    var
      jshintrc = require( 'fs' ).readFileSync( __dirname + '/../.jshintrc' ),
      config = JSON.parse( jshintrc );

    if ( fewu.config( 'esnext' ) ) {
      config.esnext = true;
      config.strict = false;
    }

    config.esnext = fewu.config( 'esnext' ) || config.esnext;

    return config;
  };

gulp.task( 'lint-node', function() {
  var
    jshint = require( 'gulp-jshint' ),

    files = fewu.files( 'node' ),
    config = getConfig();

  config.node = true;
  config.globals = fewu.config( 'globals' );

  return gulp.src( files )
    .pipe( jshint( config ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jshint.reporter( 'fail' ) );

} );

gulp.task( 'lint-browser', function() {
  var
    jshint = require( 'gulp-jshint' ),

    files = fewu.files( 'browser' ),
    config = getConfig();

  config.browser = true;
  config.globals = fewu.config( 'globals' );

  return gulp.src( files )
    .pipe( jshint( config ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jshint.reporter( 'fail' ) );

} );
