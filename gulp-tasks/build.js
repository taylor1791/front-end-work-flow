// Build
// TODO data-uri example
// TODO CSS Sprite generation

'use strict';

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
    maps    = require( 'gulp-sourcemaps' ),
    prefix  = require( 'gulp-autoprefixer' ),
    cssMin  = require( 'gulp-minify-css' ),
    concat  = require( 'gulp-concat' ),
    rev     = require( 'gulp-rev' ),

    buildDir  = fewu.config( 'build.directory' ),
    lessPaths = [ process.cwd() + '/node_modules/' ];

  return gulp.src( fewu.files( 'css' ) )
    .pipe( maps.init() )
    .pipe( less( { paths: lessPaths } ) )
    .on( 'error', function() {
      console.log( arguments );
    } )
    .pipe( prefix( fewu.config( 'build.cssAutoprefix' ) ) )
    .pipe( cssMin() )
    .pipe( concat( fewu.config( 'build.css' ) ) )
    .pipe( rev() )
    .pipe( maps.write( '.' ) )
    .pipe( gulp.dest( buildDir ) )
    .pipe( rev.manifest( buildDir + '/rev-manifest.json', {
      base: buildDir + '/',
      merge: true
    } ) )
    .pipe( gulp.dest( buildDir ) );

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
    rev     = require( 'gulp-rev' ),

    buildDir  = fewu.config( 'build.directory' ),
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
    .pipe( header( fewu.config( 'build.header' ), {
      pkg: require( process.cwd() + '/package' ),
      date: new Date()
    } ) )
    .pipe( rev() )
    .pipe( maps.write( '.' ) )
    .pipe( gulp.dest( buildDir ) )
    .pipe( rev.manifest( buildDir + '/rev-manifest.json', {
      base: buildDir + '/',
      merge: true
    } ) )
    .pipe( gulp.dest( buildDir ) );

} );

gulp.task( 'build-html', [ 'build-js', 'build-css', 'build-clean' ], function() {

  var
    htmlreplace = require( 'gulp-html-replace' ),
    htmlMin = require( 'gulp-minify-html' ),

    buildDir = fewu.config( 'build.directory' ),
    fileReves = require( '../../' + buildDir + '/rev-manifest.json' ),

    indexBuild = gulp.src( fewu.config( 'root' ) + '/index.html' )
      .pipe( htmlreplace( {
        js: fileReves[ fewu.config( 'build.js' ) ],
        css: fileReves[ fewu.config( 'build.css' ) ]
      } ) )
      .pipe( htmlMin( { conditionals: true } ) )
      .pipe( gulp.dest( fewu.config( 'build.directory' ) ) );


  return indexBuild;

} );

gulp.task( 'copy-assets', [ 'build-clean' ], function() {
    var
      merge   = require( 'merge-stream' ),
      imageMin = require( 'gulp-imagemin' ),

      staticAssetPaths = fewu.config( 'build.static' ),
      staticAssets = Object.keys( staticAssetPaths ),
      assetStreams = staticAssets.map( function( pattern ) {

        return gulp.src( pattern )
          .pipe( imageMin( {
            optimizationLevel: 7,
            progressive: true,
            interlaced: true
          } ) )
          .pipe( gulp.dest(
            fewu.config( 'build.directory' ) + staticAssetPaths[ pattern ]
          ) );
      } );

    return merge.apply( null, assetStreams );

} );
