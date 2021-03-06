'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-net:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({projectType: 'consoleapp'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'Program.cs',
      'project.json'
    ]);
  });
});
