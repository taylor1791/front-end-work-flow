//
// Testing code is the only way to gain confidence that units of code are
// both syntactically and semantically correct, short of formal verification.
// In addition, it provides confidence modifications to the code did not break
// anything else. Unfortunately, unit testing can only test for the presence of
// bugs, not the absence. This is because the space of valid inputs are
// infinite and writing that number of tests is impossible.
//

'use strict';

var
  gulp  = require( 'gulp' ),
  R = require( 'ramda' ),
  fewu = require( './setup' );

gulp.task( 'unit-test', function( done ) {

  var
    karma = require( 'karma' ).server,

    libs = R.mixin( fewu.files( 'libraries' ), fewu.files( 'devLibraries' ) ),
    libFiles = Object.keys( libs ).map( function( libFile ) {
      var libFilePath = libs[ libFile ];

      return /\/$/.test( libFilePath ) ?
        libFilePath + '**/*.{js,css}' :
        libFilePath;
    } ),

    files =
      libFiles.concat(
        fewu.files( 'unit' ),
        fewu.files( 'browser' )
      ).filter( function( fileSpec ) {
        return !/^!/.test( fileSpec );
      } );

  karma.start( {
    configFile: __dirname + '/../karma.conf.js',
    basePath: __dirname + '/../..',
    files: files,
    singleRun: true
  }, done );

} );
