'use strict';

var
  // Bootstrap the gulp app and get an instance of gulp
  gulp = require( __dirname + '/gulp-tasks/gulp-few-setup' ),

  // Keep a copy of all the tasks to generate a help message
  taskNames = null,
  aggTaskNames = null,

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

  // The workflow is purposefully extendible. Allowing other projects to add
  // files to validate treating them as first class citizens.
  additional = {
    package: [ ],
    node: [ ],
    browser: [ ],
    json: [ ],
    html: [ ],
    unit: [ ],
    libraries: [ ]
  },

  // The configuration that users of FEW can modify.
  config = {
    files: additional
  },

  // Define all the workflows
  // Create all the aggregate tasks or "workflows"
  aggTasks = {
    'siren-sing': {
      dependencies: [ 'serve' ],
      watches: [
        {
          files: [ 'node' ],
          tasks: [ 'lint-node' ]
        }, {
          files: [ 'browser' ],
          tasks: [ 'lint-browser', 'unit-test' ]
        }, {
          files: [ 'json' ],
          tasks: [ 'lint-json' ]
        }, {
          files: [ 'html' ],
          tasks: [ 'lint-html' ]
        }, {
          files: [ 'unit' ],
          tasks: [ 'unit-test' ]
        }
      ]
    }
  };

  // express medusa-gaze in terms of siren-song
  aggTasks[ 'medusa-gaze' ] = JSON.parse( JSON.stringify( aggTasks[ 'siren-sing' ] ) );
  aggTasks[ 'medusa-gaze' ].watches[ 0 ].tasks.push( 'coding-style' );
  aggTasks[ 'medusa-gaze' ].watches[ 1 ].tasks.push( 'coding-style' );
  aggTasks[ 'medusa-gaze' ].watches[ 4 ].tasks.push( 'coding-style' );



// Attach a function to the gulp singleton that computes all the files to
// validate. This allows for the gulp tasks to be split across multiple files
// effectively moving the focus from the individual tasks to the workflow.
gulp.files = function( type ) {
  return ( workflow[ type ] || [] ).concat(
    config.files[ type ] || []
  );
};

// Attach a function to the gulp singleton that computes all retrieves
// user configuration.
gulp.config = function( key ) {
  return config[ key ];
};

// Create a list of the loaded tasks.
taskNames = Object.keys( gulp.tasks );
aggTaskNames = Object.keys( aggTasks );

// Create the workflow tasks
aggTaskNames.forEach( function( workflowName ) {
  var workflowConfig = aggTasks[ workflowName ];

  gulp.task( workflowName, workflowConfig.dependencies, function() {
    workflowConfig.watches.forEach( function( watch ) {
      gulp.watch(
        watch.files.map( gulp.files ).reduce( function( a, b ) {
          return a.concat( b );
        } ),
        watch.tasks
      );
    } );
  } );

} );

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
    repeat = function( text, n ) {
      return new Array( n + 1).join ( text );
    },
    indentTextN = function( n, text ) {
      return n === 0 ? text : indentTextN( n - 1, indentText( text ) );
    },
    indentText = function( text ) {
      return '  ' + text;
    },
    indent = function() {
      var args = Array.prototype.slice.call( arguments );
      return args.map( indentText )
    },
    title = function ( name ) {
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
      taskNames.map( indentTextN.bind( null, 2 ) ),
      '',
      title( 'Workflows'),
      aggTaskNames.map( indentTextN.bind( null, 2 ) ),
      ''
    ).join( '\n' )
  );

} );
