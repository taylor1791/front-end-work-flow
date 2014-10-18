'use strict';

var
  gulp      = require( 'gulp' ),
  plugins   = require( 'gulp-load-plugins' )(),

  // Keeps track of all the different files and their type for linting.
  fileTypes = {
    json: [
      __dirname + '/package.json',
      __dirname + '/.jshintrc',
      __dirname + '/.jscsrc'
    ],
    browser: [ ],
    node: [ __dirname + '/gulpfile.js' ],
    html: [ ]
  },
  // This files are added by others when this module is `require`d and allows
  // this workflow to be extended.
  addFiles = {
    node: [ ],
    browser: [ ],
    json: [ ],
    html: [ ]
  };

// Expose the addFiles object so that other gulpfiles can add to the linting
// tasks. This allows this repository to be a "sub-module" of an existing
// repository.
exports = module.exports = addFiles;

//
// Linting is the process of identifing usage of unidomatic features of
// language. This is a tool to prevent bugs by warning the programmer of the
// useage of "bad" features.
//

gulp.task( 'lint-node', function() {
  var files = fileTypes.node.concat( addFiles.node );

  return gulp.src( files )
    .pipe( plugins.jshint( {
      node: true
    } ) )
    .pipe( plugins.jshint.reporter( 'jshint-stylish' ) )
    .pipe( plugins.jshint.reporter( 'fail' ) );
} );

gulp.task( 'lint-browser', function() {
  var files = fileTypes.browser.concat( addFiles.browser );

  return !files.length ? true : gulp.src( files )
    .pipe( plugins.jshint( {
      browser: true
    } ) )
    .pipe( plugins.jshint.reporter( 'jshint-stylish' ) )
    .pipe( plugins.jshint.reporter( 'fail' ) );
} );

// JSON linting
gulp.task( 'lint-json', function() {
  var files = fileTypes.json.concat( addFiles.json );

  return gulp.src( files )
    .pipe( plugins.jsonlint() )
    .pipe( plugins.jsonlint.reporter() );
} );

// HTML linting
gulp.task( 'lint-html', function() {
  var files = fileTypes.html.concat( addFiles.html );

  return !files.length ? true : gulp.src( files )
    .pipe( plugins.htmlhint() )
    .pipe( plugins.htmlhint.reporter() );
} );

gulp.task( 'coding-style', function() {
  var files = fileTypes.node
    .concat( fileTypes.browser )
    .concat( addFiles.node )
    .concat( addFiles.browser );

  return gulp.src( files )
    .pipe( plugins.jscs( __dirname + '/.jscsrc' ) );
} );

gulp.task( 'default', function() {

  var
    helpMessage = [
      '',
      '  Available Tasks',
      '  ---------------',
      ''
    ],
    tasks = Object.keys( gulp.tasks ).map( function( taskName ) {
      return '  ' + taskName;
    } );

  console.log( helpMessage.concat( tasks ).concat( [ '' ] ).join( '\n' ) );

} );
