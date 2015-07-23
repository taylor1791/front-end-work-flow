//
// `browser-sync` is live reload on steroids. It keeps all browsers in sync
// when viewing pages in multiple browsers. This includes scrolling, links,
// filling out forms and more. It will even inject CSS if it changes.
// Not to mention the built in server with a public URL.
//

'use strict';

var
  gulp = require( 'gulp' ),
  R = require( 'ramda' ),
  fewu = require( './setup' );

gulp.task( 'serve', function() {
  var browserSync = require( 'browser-sync' );

  // Other gulp tasks can trigger a broswer refresh by emitting a
  // `broswer-update` event.
  gulp.on( 'browser-update', function( args ) {
    args.pipe( browserSync.reload( { stream: true } ) );
  } );

  browserSync( {
    port: process.env.PORT || undefined,
    server: {
      baseDir: fewu.config( 'root' ),
      routes: R.merge( fewu.files( 'devLibraries' ), fewu.files( 'libraries' ) )
    },
    watchOptions: {
      debounceDelay: 100
    },
    ghostMode: {
      location: true
    },
    logFileChanges: false
  } );

} );
