// Build
// TODO data-uri example
// TODO CSS Sprite generation

'use strict';

// TODO #1 Sourcemaps for CSS: Waiting for CSSO to support gulp-sourcemaps
// TODO #2 Wait for bug fix in gulp-rev relating to destination of manifest
// TODO #3 Remove gulp-addsrc when contra fixed issue gulpjs/gulp/issues/840

var
  gulp = require( 'gulp' ),
  fewu = require( './setup' );

gulp.task( 'build-clean', function( cb ) {
  var del = require( 'del' );

  del( fewu.config( 'build.directory' ), cb );
} );

gulp.task( 'build-css', [ 'build-clean' ], function() {

  var
    less    = require( 'gulp-less' ),
    prefix  = require( 'gulp-autoprefixer' ),
    csso    = require( 'gulp-csso' ),
    concat  = require( 'gulp-concat' ),
    // TODO #2 rev     = require( 'gulp-rev' );

    lessPaths = [ process.cwd() + '/node_modules/' ];

  return gulp.src( fewu.files( 'css' ) )
    // TODO #1 .pipe( maps.init() )
    .pipe( less( { paths: lessPaths } ) )
    .on( 'error', function() {
      console.log( arguments );
    } )
    .pipe( prefix( fewu.config( 'build.cssAutoprefix' ) ) )
    .pipe( csso() )
    .pipe( concat( fewu.config( 'build.css' ) ) )
    // TODO #1 .pipe( maps.write() )
    // TODO #2 .pipe( rev() )
    .pipe( gulp.dest( fewu.config( 'build.directory' ) ) );
    // TODO #2 .pipe( rev.manifest( 'rev-manifest.json', { merge: true } ) )
    // TODO #2 .pipe( gulp.dest( gulp.config( 'build' ) ) );

} );

gulp.task( 'build-js', [ 'build-clean' ], function() {

  var
    header  = require( 'gulp-header' ),
    htmlMin = require( 'gulp-minify-html' ),
    gulpif  = require( 'gulp-if' ),
    ngTemplateCache = require( 'gulp-angular-templatecache' ),
    // TODO #3
    add     = require( 'gulp-add-src' ),
    maps    = require( 'gulp-sourcemaps' ),
    ngAnnotate = require( 'gulp-ng-annotate' ),
    uglify  = require( 'gulp-uglify' ),
    concat  = require( 'gulp-concat' ),
    // TODO #1 rev     = require( 'gulp-rev' ),

    libs = fewu.files( 'libraries' ),
    libFiles = Object.keys( libs ).map( function( libFile ) {
      var libFilePath = libs[ libFile ];

      return /\.js$/.test( libFilePath ) ?
        libFilePath.replace( /\.\//g, '' ) : false;
    } ).filter( function( x ) {
      return x;
    } );

  return gulp.src( [
      fewu.config( 'root' ) + '/**/*.{html,svg}',
      '!' + fewu.config( 'root' ) + '/index.html'
    ] )
    .pipe( htmlMin( { conditionals: true } ) )
    .pipe( gulpif( !!fewu.config( 'angular.module' ),
      ngTemplateCache( {
        module: fewu.config( 'angular.module' ),
        root: fewu.config( 'angular.root' )
      } )
    ) )
    // TODO #3 .pipe( gulp.src( libFiles.concat( gulp.files( 'browser' )  ) )
    .pipe( add( libFiles.concat( fewu.files( 'browser' ) ) ) )
    .pipe( maps.init() )
    .pipe( gulpif( !!fewu.config( 'angular.module' ), ngAnnotate() ) )
    .pipe( uglify( { } ) )
    .pipe( concat( fewu.config( 'build.js' ) ) )
    .pipe( header(
      fewu.config( 'build.header' ),
      {
        pkg: require( process.cwd() + '/package' ),
        date: new Date()
      }
    ) )
    // TODO #2 .pipe( rev() )
    .pipe( maps.write( '.' ) )
    .pipe( gulp.dest( fewu.config( 'build.directory' ) ) );
    // TODO #2 .pipe( rev.manifest( {
    // TODO #2   base: 'dist/',
    // TODO #2   merge: true
    // TODO #2 } ) )
    // TODO #2 .pipe( gulp.dest( 'dist/' ) );

} );

gulp.task( 'build-html', [ 'build-css', 'build-js' ], function() {

// TODO image minification
  var
    merge   = require( 'merge-stream' ),

    htmlreplace = require( 'gulp-html-replace' ),
    htmlMin = require( 'gulp-minify-html' ),
    imageMin = require( 'gulp-imagemin' ),

    staticFiles = gulp.src( fewu.config( 'build.static' ) )
      .pipe( imageMin( {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
      } ) )
      .pipe( gulp.dest( fewu.config( 'build.directory' ) ) ),

    indexBuild = gulp.src( fewu.config( 'root' ) + '/index.html' )
      .pipe( htmlreplace( {
        js: fewu.config( 'build.js' ), css: fewu.config( 'build.css' )
      } ) )
      .pipe( htmlMin( { conditionals: true } ) )
      .pipe( gulp.dest( fewu.config( 'build.directory' ) ) );

  return merge( indexBuild, staticFiles );

} );
