//
// Uses (htmlhint)[https://github.com/yaniswang/HTMLHint], to validate HTML. A
// complete list of rules is available one their
// [wiki](https://github.com/yaniswang/HTMLHint/wiki/Rules)
//

'use strict';

var
  gulp = require( 'gulp' );

gulp.task( 'lint-html', function() {
  var
    htmlhint = require( 'gulp-htmlhint' ),

    files = gulp.files( 'html' );

  return gulp.src( files )
    .pipe( htmlhint( {
      'doctype-first': false
    } ) )
    .pipe( htmlhint.reporter() );
} );
