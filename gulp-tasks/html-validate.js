//
// Uses (htmlhint)[https://github.com/yaniswang/HTMLHint], to validate HTML. A
// complete list of rules is available one their
// [wiki](https://github.com/yaniswang/HTMLHint/wiki/Rules)
//

var
  gulp = require( 'gulp' ),
  htmlhint = require( 'gulp-htmlhint' );

gulp.task( 'lint-html', function() {
  var files = gulp.files( 'html' );

  return gulp.src( files )
    .pipe( htmlhint( {
      doctype-first: false
    } ) )
    .pipe( htmlhint.reporter() );
} );
