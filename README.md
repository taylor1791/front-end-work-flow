Front-End-Workflow
==================

Workflow for JavaScript minors and olympiads

Front-End-Workflow is an opinionated, extensible workflow for SPA development.
It allows a project to "register" files and perform gulp tasks on them. In
addition, workflows exist that facilitate development.

Usage
-----

Once understood, the Front-End-Workflow is simple to use. First clone the
[repository](http://github.com/taylor1791/Front-End-Workflow) into the project
directory (I recommend using `git submodule`s) and create a `Gulpfile.js` with
the following contents.

    var few = require( './front-end-workflow/gulpfile.js' );

After making sure a local gulp exists (`npm install gulp`), typing `gulp` will
print a list of the available tasks. If dependencies are missing, `gulp install`
will be the only available command. This will use `npm` to programatically
install the dependencies of all registered `package.json` files. To register a
`package.json` use the following code.

    var few == require( './front-end-workflow/gulpfile.js' );

    few.files.package: [ __dirname + '/package.json' ];

Now, `gulp install` will also install all the dependencies for the current
project as well. See the configuration section for more details.

Workflows
---------

### medusa-gaze

development+

### manticore-sting

benchmark and test

### cyclops-crush

build

### minotaur-charge

deploy

`gulp medusa-gaze` is a workflow that lints html, json, node, and browser
JavaScript. It also checks coding style.

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

    var few = require( './front-end-workflow/gulpfile.js' );

    few.files = {
      package: [ __dirname + '/package.json' ]
    };

#### package

   package: [ __dirname + '/package.json' ]

#### node

    node: [ './gulpfile.js' ]

#### json

    json: [ './package.json' ]

#### browser

    browser: []

#### css

#### html

    html: []

#### static

#### unit

    unit: []

#### libraries

   few.files = {
     libraries: {
       '/angular/': './node_modules/angular/'
     }
   };

#### devLibraries

TODO
----

// TODO use node's path module

// TODO gulp task for tunnel

// Analysis
// TODO codebaseStats - plato
// TODO Taylor analysis
// TODO pagespeed
// TODO Code coverage

// Build
// TODO data-uri example
// TODO CSS Sprite generation
// File replace

// TODO look https://github.com/google/web-starter-kit/blob/master/gulpfile.js
