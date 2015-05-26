//
// Uses (jsonlint)[https://github.com/zaach/jsonlint], the library that
// validates jsonlint.com to, well... validate JSON. This library provides
// details that V8's JSON.parse does not.
//

'use strict';

var
  gulp = require( 'gulp' ),
  fewu = require( './setup' );

gulp.task( 'lint-json', function() {
  var
    jsonlint = require( 'gulp-jsonlint' ),

    files = fewu.files( 'json' ).concat( fewu.exclude( 'libraries' ) );

  return gulp.src( files )
    .pipe( jsonlint() )
    .pipe( jsonlint.reporter() );
} );
