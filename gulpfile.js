'use strict';

var
  // Bootstrap the gulp app and get an instance of gulp
  fewu = require( __dirname + '/gulp-tasks/setup' ),
  gulp = require( 'gulp' );

// All the workflow files classified by their type. The type (key) dictates what
// types of validations that apply to the files.
fewu.defaults.files = {
  node: [ __dirname + '/gulpfile.js', __dirname + '/gulp-tasks/*.js' ],
  json: [
    __dirname + '/package.json',
    __dirname + '/.jshintrc',
    __dirname + '/.jscsrc'
  ],
  unit: [ __dirname + '/test/*.test.js' ]
};

// Define a task dedicated to helping the user out.
gulp.task( 'default', function() {
  var
    repeat = function( text, n ) {
      return new Array( n + 1 ).join ( text );
    },
    indentTextN = function( n, text ) {
      return n === 0 ? text : indentTextN( n - 1, indentText( text ) );
    },
    indentText = function( text ) {
      return '  ' + text;
    },
    indent = function() {
      var args = Array.prototype.slice.call( arguments );
      return args.map( indentText );
    },
    title = function( name ) {
      return [ ].concat(
        '',
        indent(
          name,
          repeat( '-', name.length )
        ),
        ''
      );
    };

  console.log(
    [].concat(
      title( 'Available Tasks' ),
      fewu.tasks.map( indentTextN.bind( null, 2 ) ),
      '',
      fewu.aggTasks ? title( 'Workflows' ) : undefined,
      fewu.aggTasks ?
        fewu.aggTasks.map( indentTextN.bind( null, 2 ) ) : void 0,
      ''
    ).filter( function( x ) {
      return x !== undefined;
    } ).join( '\n' )
  );

} );

// Expose the configuration object so that other node scripts can specify files
// for validation. This allows this repository to be a "sub-module" (hopefully a
// git submodule) of other repositories.
exports = module.exports = fewu.defaults;
