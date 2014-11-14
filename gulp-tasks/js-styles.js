//
// Uses (jscs)[https://github.com/jscs-dev/node-jscs], to enforce a uniform
// coding style. Many people consider this overkill, but people have a finite
// attention span before they start to compromise their rational decisions.
// Having a machine yell at them is better than me. For a full list of options
// see the [rules](https://github.com/jscs-dev/node-jscs#rules).
//

var
  gulp = require( 'gulp' ),
  jscs = require( 'gulp-jscs' );

gulp.task( 'coding-style', function() {
  var
    files = gulp.files( 'browser' )
      .concat( gulp.files( 'node' ) )
      .concat( gulp.files( ' browser' ) )
      .concat( gulp.files( 'unit' ) );

  return gulp.src( files )
    .pipe( jscs( __dirname + '/../.jscsrc' ) );
} );
