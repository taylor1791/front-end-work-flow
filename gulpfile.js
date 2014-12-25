'use strict';

var
  // Bootstrap the gulp app and get an instance of gulp
  gulp = require( __dirname + '/gulp-tasks/gulp-few-setup' ),

  // Keep a copy of all the tasks to generate a help message
  tasks = null,

  // All the workflow files classified by their type. The type (key) dictates
  // what types of validations that apply to the files.
  workflow = {
    package: [ __dirname + '/package.json' ],
    node: [ __dirname + '/gulpfile.js', __dirname + '/gulp-tasks/*.js' ],
    browser: [ ],
    json: [
      __dirname + '/package.json',
      __dirname + '/.jshintrc',
      __dirname + '/.jscsrc'
    ],
    html: [ ],
    unit: [ __dirname + '/test/*.test.js' ],
    serve: [ ]
  },

  // The workflow is purposfully extendable. Allowing other projects to add
  // files to validate treating them as first class citizens.
  additional = {
    package: [ ],
    node: [ ],
    browser: [ ],
    json: [ ],
    html: [ ],
    unit: [ ],
    serve: [ ]
  },

  config = {
    files: additional
  };

// Attach a function to the gulp singleton that computes all the files to
// validate. This allows for the gulp tasks to be split accross multiple files
// effectivle moving the focus from the individual tasks to the workflow.
gulp.files = function( type ) {
  return ( workflow[ type ] || [] ).concat( config.files[ type ] || [] );
};

// Create a list of the loaded tasks.
tasks = Object.keys( gulp.tasks );

// This is a development workflow
gulp.task( 'medusa-gaze', [ 'serve' ], function() {
  gulp.watch( gulp.files( 'node' ), [ 'lint-node', 'coding-style' ] );
  gulp.watch(
    gulp.files( 'browser' ),
    [ 'lint-browser', 'coding-style', 'unit-test' ]
  );
  gulp.watch( gulp.files( 'json' ), [ 'lint-json' ] );
  gulp.watch( gulp.files( 'html' ), [ 'lint-html' ] );
  gulp.watch( gulp.files( 'unit' ), [ 'coding-style', 'unit-test' ] );
} );

// Expose the `additionalFiles` object so that other node scripts can add files
// for validation. This allows this repository to be a "sub-module" (hopefully a
// git submodule) of other repositories.
exports = module.exports = config;

// Define a task dedicated to helping the user out.
gulp.task( 'default', function() {
  var
    message = [
      '',
      '  Available Tasks',
      '  ---------------',
      ''
    ],
    taskLines = tasks.map( function( name ) {
      return '    ' + name;
    } );

  console.log( message.concat( taskLines ).concat( '' ).join( '\n' ) );

} );
