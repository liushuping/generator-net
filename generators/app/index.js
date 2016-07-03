'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the .NET Core generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'projectType',
      message: 'Select a project type',
      choices: [{
        name: 'Console Application (.NET Core)',
        value: 'consoleapp'
      }, {
        name: 'Web Application (ASP.NET Core)',
        value: 'webapp'
      }, {
        name: 'Unit Test Project (xUnit.net)',
        value: 'unittest'
      }]
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  askForName: function () {
    var appType;
    switch (this.props.projectType) {
    case 'consoleapp':
      appType = 'Console Application';
      break;
    case 'webapp':
      appType = 'Web Application';
      break;
    case 'unittest':
      appType = 'Unit Test';
      break;
    default:
      appType = 'Console Application';
      break;
    }

    var appName = appType.replace(' ', '') + '1';

    var prompts = [{
      type: 'string',
      name: 'projectName',
      message: 'What\'s the name of your ' + appType,
      default: appName
    }];

    return this.prompt(prompts).then(function (props) {
      _.extend(this.props, props);
    }.bind(this));
  },

  writing: function () {
    switch (this.props.projectType) {
    case 'consoleapp':
      this._writeConsoleApp();
      break;
    case 'webapp':
      this._writeWebApp();
      break;
    case 'unittest':
      this._writeUnitTestApp();
      break;
    default:
      break;
    }

  },

  install: function () {
    //this.installDependencies();
  },

  _writeConsoleApp: function () {
    this.fs.copyTpl(
      this.templatePath('consoleapp/Program.cs'),
      this.destinationPath('Program.cs'),
      {
        namespace: this.props.projectName
      }
    );

    this.fs.copy(
      this.templatePath('consoleapp/project.json'),
      this.destinationPath('project.json')
    );
  },

  _writeWebApp: function () {
    this.fs.copyTpl(
      this.templatePath('webapp/Program.cs'),
      this.destinationPath('Program.cs'),
      {
        namespace: this.props.projectName
      }
    );

    this.fs.copyTpl(
      this.templatePath('webapp/Startup.cs'),
      this.destinationPath('Startup.cs'),
      {
        namespace: this.props.projectName
      }
    );

    this.fs.copy(
      this.templatePath('webapp/project.json'),
      this.destinationPath('project.json')
    );
  },

  _writeUnitTestApp: function () {
    this.fs.copyTpl(
      this.templatePath('unittest/Class1Test.cs'),
      this.destinationPath('Class1Test.cs'),
      {
        namespace: this.props.projectName
      }
    );

    this.fs.copy(
      this.templatePath('unittest/xunit.runner.json'),
      this.destinationPath('xunit.runner.json')
    );

    this.fs.copy(
      this.templatePath('unittest/project.json'),
      this.destinationPath('project.json')
    );
  }
});
