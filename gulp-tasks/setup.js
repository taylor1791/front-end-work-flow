//
// This attempts to load all gulp tasks. If it fails, then will tell the user to
// run gulp install.
//

'use strict';

var
  gulp = require( 'gulp' ),
  gutil = require( 'gulp-util' ),
  R = require( 'ramda' ),
  aggTasks = {};

require( 'require-dir' )( '.' );

module.exports.exclude = function( path ) {
  var files = module.exports.files( path );

  if( typeof files === 'object' ) {
    files = Object.keys( files ).map( function( ptn ) {
      return files[ ptn ];
    } );
  }

  return files.map( function( file ) {
    return '!' + (
      /\/$/.test( file ) ?
        file + '**/*' :
        file
      );
  } );
};

// Grab the names of all the tasks before adding the workflows.
module.exports.tasks = Object.keys( gulp.tasks );

module.exports.defaults = {
  globals: { },
  esnext: false,
  root: 'app/',
  jshintrc: '.jshintrc',
  jscsrc: '.jscsrc',
  karma: {
    basePath: process.cwd(),
    frameworks: [ 'jasmine' ],
    reporters: [ 'progress' ],
    browsers: [ 'PhantomJS' ]
  },
  jshint: { },
  jscs: { },
  angular: {
    module: '',
    root: '/'
  },
  files: {
    node: [ ],
    json: [ ],
    browser: [ ],
    css: [ ],
    html: [ ],
    unit: [ ],
    libraries: { },
    devLibraries: { }
  },
  build: {
    directory: 'dist/',
    'static': {},
    js: 'app.js',
    css: 'style.css',
    header: [ '/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @version v<%= pkg.version %>',
      ' * @license <%= pkg.license %>',
      ' */',
      ''
    ].join( '\n' ),
    cssAutoprefix: [ 'IE 8', '> 1%', 'last 2 versions' ]
  }
};

//
// Define all the aggregate tasks
//

// The standard development workflow
aggTasks[ 'medusa-gaze' ] = {
  dependencies: [ 'serve' ],
  watches: [
    {
      files: [ 'node' ],
      tasks: [ 'lint-node', 'js-styles' ]
    }, {
      files: [ 'browser' ],
      tasks: [ 'lint-browser', 'unit-test', 'js-styles' ]
    }, {
      files: [ 'json' ],
      tasks: [ 'lint-json' ]
    }, {
      files: [ 'html' ],
      tasks: [ 'lint-html' ]
    }, {
      files: [ 'unit' ],
      tasks: [ 'unit-test', 'js-styles' ]
    }
  ]
};

// A single run of all tests
aggTasks[ 'manticore-sting' ] = {
  dependencies: [
    'lint-json', 'lint-html', 'lint-browser', 'lint-node',
    'js-styles', 'unit-test'
  ]
};

// The build task
aggTasks[ 'cyclops-crush' ] = {
  dependencies: [ 'build-js', 'build-css', 'build-html', 'copy-assets' ]
};

// The deploy task
aggTasks[ 'minotaur-charge' ] = function() {
  gutil.log(
    gutil.colors.red( 'FEW: minotaur-charge is not yet implemented' )
  );
};

// Expose all the aggregate tasks
module.exports.aggTasks = Object.keys( aggTasks );

// Add an accessor method that gets configuration values.
module.exports.config = R.flip( R.path )( module.exports.defaults );

// Add an accessor for getting all the files. This allows for the gulp tasks
// to be split across multiple files effectively.
module.exports.files = function( path ) {
  return ( R.path( 'defaults.files.' + path, module.exports ) || [] );
};

// Create all the aggregate tasks and "workflows"
Object.keys( aggTasks ).forEach( function( taskName ) {
  var
    workflowConfig = aggTasks[ taskName ],
    dependencies = workflowConfig.dependencies || [],
    task = typeof workflowConfig === 'function' ?
      workflowConfig : function() {

        ( workflowConfig.watches || [] ).forEach( function( watch ) {
          var files =
            watch.files.map( module.exports.files ).reduce( R.concat );

          gulp.watch( files, watch.tasks );
        } );

      };

  gulp.task( taskName, dependencies, task );
} );
