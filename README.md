Front-End-Workflow
==================

Workflow for JavaScript minors and olympiads

Front-End-Workflow is an opinionated, extensible workflow for SPA development.
It allows a project to "register" files and perform gulp tasks on them. In
addition, workflows exist that facilitate development.

Usage
-----

Once understood, the Front-End-Workflow is simple to use. Simply run the
following commands.

    $ npm install gulp front-end-work-flow --save-dev

Then, create a gulpfile with the following contents.

    var few = require( 'front-end-work-flow/gulpfile.js' );

At this point typeing `gulp` will print out a help message with the available
tasks.

Workflows
---------

### medusa-gaze

The development starts a server and watches files for changes. When changes
occur html, json, node, and browser JavaScript are linted and checked for
code styling. Unit tests are also run.

### manticore-sting

This runs everything mentioned `medusa-gaze` except the developement server, 
functioning as a test suite.

### cyclops-crush

The is the standard dist build. Lots of things happen.

### minotaur-charge

Must be implemented by developers and is ment to be the deploy task

Configuration
-------------

`front-end-workflow` returns a `FEW Object`. Here is a complete list of all the
available options for `FEW Objects`s.

### globals

### esnext

Turns on es6 parsing on jshint and jscs.

### root

### angular

#### module

#### root

### files

This is a name space for registering all the different files.

    var few = require( 'front-end-work-flow/gulpfile.js' );

    few.files = { };

#### node

    node: [ './gulpfile.js' ]

#### json

    json: [ './package.json' ]

#### browser

    browser: []

#### css

#### html

    html: []

#### unit

    unit: []

#### libraries

   few.files = {
     libraries: {
       '/angular/': './node_modules/angular/'
     }
   };

#### devLibraries


FAQ
---

### How do I use data-uris?

Data URIs are built into LESS using the data-uri function.

### How can I use custom jshint or jscs config


TODO
----

// TODO use gulp-watch instead of gulp.watch
// TODO Add options to disable browser sync
// TODO what borked auto-refresh
// TODO gulp flag for tunnel
// TODO gulp task no open
// TODO gulp-rev-all
// TODO build standalone static development

// Analysis
// TODO codebaseStats - plato
// TODO overtime
// TODO pagespeed
// TODO Code coverage

// Build
// TODO data-uri example
// TODO CSS Sprite generation
// File replace

// TODO look https://github.com/google/web-starter-kit/blob/master/gulpfile.js
