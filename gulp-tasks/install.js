//
// This script creates the install task and its only dependencies are
// gulp and npm.

'use strict';

var

  // Converts the Package.json dependency objects in to an array of
  // node packages. E.g "npm@2.1.0"
  pkgDepsToDepArr = function( x ) {

    return Object.keys( x )
      .map( function( packageName ) {
        return packageName + '@' + x[ packageName ];
      } )
      // Given that gulp is already installed, filter it out. Failing to do so
      // will result in mysterous errors about modules failing to load.
      .filter( function( packageName ) {
        return !packageName.match( /^gulp@/ );
      } );

  },

  // Create an array of node package dependencies from a package.json
  createDepArr = function( packageJson ) {
    var
      deps = packageJson.dependencies || {},
      devDeps = packageJson.devDependencies || {};

    return pkgDepsToDepArr( deps ).concat( pkgDepsToDepArr( devDeps ) );
  },

  npm   = require( 'npm' ),
  gulp  = require( 'gulp' ),
  fewu = require( './setup' ),
  gutil = require(
    process.cwd() + '/node_modules/gulp/node_modules/gulp-util'
  );

// This task will use npm to  install all the dependencies for all
// registered `package.json` files.
gulp.task( 'install', function( cb ) {
  npm.load( { loaded: false }, function( err ) {

    var dependencies = [].concat.apply( [],
      fewu.defaults.files[ 'package' ].concat( '../package.json' )
        .map( require ).map( createDepArr )
    );

    if ( err ) {
      gutil.log(
        gutil.colors.red( 'FEW: There was an error instantiating npm.' )
      );
      throw err;
    }

    gutil.log(
      gutil.colors.cyan( 'FEW: Installing workflow dependencies...' )
    );
    npm.commands.install( dependencies, function( errr, data ) {

      if ( errr ) {
        gutil.log(
          gutil.colors.red( 'FEW: Failed to install dependencies.' )
        );
        throw errr;
      }

      gutil.log(
        gutil.colors.cyan( 'FEW: Installing workflow dependencies complete.' )
      );

    } );

  } );
} );

module.exports = gutil;
