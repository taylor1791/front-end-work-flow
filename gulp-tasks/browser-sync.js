//
// `browser-sync` is live reload on steroids. It keeps all browsers in sync
// when viewing pages in multiple browsers. This includes scrolling, links,
// filling out forms and more. It will even inject CSS if it changes.
// Not to mention the built in server with a public URL.
//

'use strict';

var
  gulp = require( 'gulp' ),
  browserSync = require( 'browser-sync' );

gulp.task( 'serve', function() {

  // Other gulp tasks can trigger a broswer refresh by emitting a
  // `broswer-update` event.
  gulp.on( 'browser-update', function( args ) {
    args.pipe( browserSync.reload( { stream: true } ) );
  } );

  browserSync( {
    port: process.env.PORT || undefined,
    server: {
      baseDir: gulp.files( 'serve' ),
      routes: gulp.files( 'libraries' )[0]
    },
    files: gulp.files( 'serve' ).map( function( dir ) {
      return dir + '/**/*.*';
    } ),
    watchOptions: {
      debounceDelay: 100
    },
    ghostMode: {
      location: true
    },
    logFileChanges: false
  } );

} );
