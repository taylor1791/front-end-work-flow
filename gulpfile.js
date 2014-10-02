'use strict';

var
  gulp       = require( 'gulp' ),
  plugins    = require( 'gulp-load-plugins' )(),
  srcFiles      = {
    json: [ __dirname + '/package.json' ]
  },
  extensions = { };

exports = module.exports = extensions;

// Generate all the linting tasks
Object.keys( srcFiles ).forEach( function( fileType ) {
  var files = srcFiles[ fileType ];

  gulp.task( 'lint-' + fileType, function() {
    gulp.src( files )
      .pipe( plugins.jsonlint() )
      .pipe( plugins.jsonlint.reporter() );
  } );
} );

