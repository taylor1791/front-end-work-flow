//
// Uses (jscs)[https://github.com/jscs-dev/node-jscs], to enforce a uniform
// coding style. Many people consider this overkill, but people have a finite
// attention span before they start to compromise their rational decisions.
// Having a machine yell at them is better than me. For a full list of options
// see the [rules](https://github.com/jscs-dev/node-jscs#rules).
//

'use strict';

var
  gulp = require( 'gulp' ),
  jscs = require( 'gulp-jscs' ),
  jscsrc = require( 'fs' ).readFileSync( __dirname + '/../.jscsrc' ),

  getConfig = function() {
    var config = JSON.parse( jscsrc );

    if ( gulp.config( 'esnext' ) ) {
      config.esnext = true;
    }

    return config;
  };

gulp.task( 'coding-style', function() {
  // The unit files are not here becauase they can include external libraires
  var
    files = gulp.files( 'browser' )
      .concat( gulp.files( 'node' ) );

  return gulp.src( files )
    .pipe( jscs( getConfig() ) );
} );
