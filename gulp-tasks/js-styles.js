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
  fewu = require( './setup' ),

  getConfig = function() {
    var
      jscsrc = require( 'fs' ).readFileSync( __dirname + '/../.jscsrc' ),
      config = JSON.parse( jscsrc );

    if ( fewu.config( 'esnext' ) ) {
      config.esnext = true;
    }

    return config;
  };

// The unit files are not here becauase they can include external libraires
gulp.task( 'js-styles', function() {
  var
    jscs = require( 'gulp-jscs' ),

    files = fewu.files( 'browser' )
      .concat( fewu.files( 'node' ) );

  return gulp.src( files )
    .pipe( jscs( getConfig() ) );
} );
