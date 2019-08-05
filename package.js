// Information about this package:
Package.describe({
  // Optional, default is package directory name
  name: 'rd010:little-dipper',
  // Short two-sentence summary
  summary: 'Provides Cosmos blockchain data as a backend',
  // Version number
  version: '0.0.1',
  // Optional GitHub URL to your source repository
  // git: 'https://github.com/something/something.git'
  documentation: 'README.md'
});

// This defines your actual package:
Package.onUse((api) => {
  api.versionsFrom('1.8.1');
  api.use('ecmascript');
  api.use('reywood:publish-composite');
  // Use the `underscore` package, but only on the server. Version not
  // specified, so it will be as of Meteor 1.4.3.1.
  api.use('underscore', 'server', 'autopublish');
  // Use `kadira:flow-router`, version 2.12.1 or newer.
  // api.use('kadira:flow-router@2.12.1');
  // Give users of this package access to active-route's JavaScript helpers.
  // api.imply('zimme:active-route@2.3.2')
  // Export the object `Email` to packages or apps that use this package.
  // api.export('Email', 'server');
  // api.export('Cosmos', 'server');
  // Specify the source code for the package.
  // api.addFiles('email.js', 'server');
  // When using `ecmascript` or `modules` packages, you can use this instead of
  // `api.export` and `api.addFiles`.
  api.mainModule('little-dipper.js', 'server');
  api.mainModule('little-dipper-client.js', 'client');
});

// This defines the tests for the package:
// Package.onTest((api) => {
  // Sets up a dependency on this package.
  // api.use('username:package-name');
  // Use the Mocha test framework.
  // api.use('practicalmeteor:mocha@2.4.5_2');
  // Specify the source code for the package tests.
  // api.addFiles('email_tests.js', 'server');
// });

// This lets you use npm packages in your package:
// Npm.depends({
//   simplesmtp: '0.3.10',
//   'stream-buffers': '0.2.5'
// });
