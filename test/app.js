/* global __dirname */

'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-tonysneed-vscode-typescript:app', function () {
  before  (function () {
    return helpers.run(path.join( __dirname, '../generators/app'))
      .withOptions({skipInstall: true})
      .toPromise();                   // Get a Promise back for when the generator finishes
  });

  it('creates files', function () {
    assert.file([
      '.vscode/launch.json',
      '.vscode/tasks.json',
      'lib/jasmine-2.4.1/boot.js',
      'lib/jasmine-2.4.1/console.js',
      'lib/jasmine-2.4.1/jasmine.css',
      'lib/jasmine-2.4.1/jasmine.js',
      'lib/jasmine-2.4.1/jasmine-html.js',
      'lib/jasmine-2.4.1/jasmine_favicon.png',
      'src/greeter/greeter.ts',
      'src/greeter/greeter.spec.ts',
      'util/custom.boot.js',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintrc',
      '.travis.yml',
      'gulp.config.js',
      'gulpfile.js',
      'karma.conf.js',
      'LICENSE',
      'package.json',
      'README.md',
      'SpecRunner.html',
      'typings.json',
      'tslint.json',
      'tsconfig.json',
    ]);
  });

  it('creates typings', function () {
    assert.file([
      'typings/index.d.ts',
      'typings/globals/jasmine/index.d.ts',
      'typings/globals/node/index.d.ts',
    ]);
  });
});