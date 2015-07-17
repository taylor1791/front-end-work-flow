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
    addCwd = R.concat( process.cwd() + '/' ),

    js = fewu.config( 'root' ) + '/**/*.js',
    html = fewu.config( 'root' ) + '/**/*.html',
    svg = fewu.config( 'root' ) + '/**/*.svg',

    libs = R.merge(
      fewu.files( 'libraries' ),
      fewu.files( 'devLibraries' )
    ),
    libFiles = Object.keys( libs ).map( function( libFile ) {
      var libFilePath = process.cwd() + '/' + libs[ libFile ];

      return /\/$/.test( libFilePath ) ?
        libFilePath + '**/*.{js,css}' :
        libFilePath;
    } ),

    files =
      [].concat(
        fewu.files( 'unit' ).map( addCwd ),
        libFiles,
        fewu.files( 'angular.module' ) ? addCwd( html ) : [],
        fewu.files( 'angular.module' ) ? addCwd( svg ) : [],
        fewu.files( 'browser' ).map( addCwd )
      ).filter( function( fileSpec ) {
        return !/^!/.test( fileSpec );
      } ),

    coverageReporter = {
      type: 'html',
      dir: fewu.config( 'coverage' )
    },

    preprocessors = {},

    karmaOptions = {
      files: files,
      singleRun: true,
      preprocessors: preprocessors,
      coverageReporter: coverageReporter
    };

  if( fewu.config( 'angular.module' ) ) {
    preprocessors[ js ] = [ 'coverage' ];
    preprocessors[ html ] = [ 'ng-html2js' ];
    preprocessors[ svg ] = [ 'ng-html2js' ];
    karmaOptions.ngHtml2JsPreprocessor = {
      stripPrefix: fewu.config( 'root' ),
      prependPrefix: fewu.config( 'angular.root' ),
      moduleName: fewu.config( 'angular.module' ) + '.templates'
    };
  }

  karmaOptions = R.merge( karmaOptions, fewu.config( 'karma' ) );

  karma.start( karmaOptions, done );

} );
