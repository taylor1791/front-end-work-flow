Front-End-Workflow
==================

Workflow for JavaScript minors and olympiads.

Workflows
---------

### medusa-gaze

`gulp medusa-gaze` is a workflow that lints html, json, node, and browser
JavaScript. It also checks coding style.

TODO
----

// Framework
// TODO bumpAppVersion
// TODO controlPreviewServer
// TODO BrowserSync

// Analysis
// TODO codebaseStats - plato
// TODO Taylor analysis
// TODO pagespeed
// TODO Code coverage

// Angular Specific
// TODO gulp-ngAnnotate
// TODO gulp-angular-templatecache
// TODO controlAPIPreviewServer
// TODO buildAPIDocs

// Testing
// TODO controlE2ETestServer
// TODO controlSeleniumServer
// TODO controlUnitTestServer

// Semi-Build
// TODO generateSprites
// TODO compileLESS
// TODO gulp-autoprefixer

// Build
// TODO injectCodeHedaer
// TODO uglify
// TODO conctenation
// TODO html minify
// TODO image minification
// TODO userref
// TODO data-uri example
// TODO CSS Sprite generation

// 
// TODO look https://github.com/google/web-starter-kit/blob/master/gulpfile.js


// TODO shrinkwrap to verify node packages
// TODO Remove Modernizr from bower and use gulp-modernizr to build and insert
// into /lib - Note, until Modernizr 3.0 is released, gulp-modernizr doesn't
// work via NPM.

// karma     = require( 'karma' ).server,

/*
    "karma": "^0.12.24",
    "karma-jasmine": "^0.1.5",
    "karma-phantomjs-launcher": "^0.1.4"
    */

/*



// Unit tests
gulp.task( 'unit-test', function( done ) {
  var files = addFiles.unit.map( function( x ) {
    return process.cwd().concat( '/', x );
  } );

  karma.start( {
    configFile: __dirname + '/karma.conf.js',
    basePath: '..',
    files: files,
    singleRun: true
  }, done );

} );
*/
