'use strict';

var
  gulp      = require( 'gulp' ),
  plugins   = require( 'gulp-load-plugins' )(),

  // Keeps track of all the different files and their type for linting.
  fileTypes = {
    json: [ __dirname + '/package.json' ]
  },
  // This
  addFiles = {
    json: []
  };

// Expose the addFiles object so that other gulpfiles can add to the linting
// tasks. This allows this repository to be a "sub-module" of an existing
// repository.
exports = module.exports = exts;

//
// Linting is the process of identifing usage of unidomatic features of
// language. This is a tool to prevent bugs by warning the programmer of the
// useage of "bad" features.

// Generates all the types of linters.
Object.keys( fileTypes ).forEach( function( fileType ) {

  gulp.task( 'lint-' + fileType, function() {
    var files = srcFiles[ fileType ].concat( addFiles.json );

    gulp.src( files )
      .pipe( plugins.jsonlint() )
      .pipe( plugins.jsonlint.reporter() );
  } );
} );

