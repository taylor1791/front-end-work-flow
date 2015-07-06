//
// Uses (jscs)[https://github.com/jscs-dev/node-jscs], to enforce a uniform
// coding style. Many people consider this overkill, but people have a finite
// attention span before they start to compromise their rational decisions.
// Having a machine yell at them is better than me. For a full list of options
// see the [rules](https://github.com/jscs-dev/node-jscs#rules).
//

'use strict';

var
  fs   = require( 'fs' ),
  gulp = require( 'gulp' ),
  fewu = require( './setup' ),
  R    = require( 'ramda' ),

  getConfig = function() {
    var
      customRcPath = process.cwd() + '/' + fewu.config( 'jscsrc' ),

      jscsrc = JSON.parse( fs.readFileSync( __dirname + '/../.jscsrc' ) ),
      fileCustomRC = !fs.exists( customRcPath ) ?
        {} : JSON.parse( fs.readFileSync( customRcPath ) ),
      manualRC = fewu.config( 'jscsrc' ),

      config = R.reduce( R.merge, {}, [ jscsrc, fileCustomRC, manualRC ] );

    // Remove all false keys since jscs requires them.
    Object.keys( config ).forEach( function( key ) {
      if( !config[ key ] ) {
        delete config[ key ];
      }
    } );

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
      .concat( fewu.files( 'node' ) )
      .concat( fewu.exclude( 'libraries' ) );

  return gulp.src( files )
    .pipe( jscs( getConfig() ) );
} );
