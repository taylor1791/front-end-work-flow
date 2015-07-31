//
// Uses (htmlhint)[https://github.com/yaniswang/HTMLHint], to validate HTML. A
// complete list of rules is available one their
// [wiki](https://github.com/yaniswang/HTMLHint/wiki/Rules)
//

'use strict';

var
  gulp = require( 'gulp' ),
  fewu = require( './setup' );

gulp.task( 'lint-html', function() {
  var
    htmlhint = require( 'gulp-htmlhint' ),

    files = fewu.files( 'html' )
      .concat( fewu.exclude( 'libraries' ) )
      .concat( fewu.exclude( 'devLibraries' ) );

  return gulp.src( files )
    .pipe( htmlhint( fewu.config( 'htmlLint' ) ) )
    .pipe( htmlhint.reporter() );
} );
