'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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

  askForName: function() {
    var appName;
    switch(this.projectType) {
      case 'consoleapp': 
        appName = 'Console Application';
        break;
      case 'webapp':
        appName = 'Web Application';
        break;
      case 'unittest':
        appName = 'Unit Test';
        break;
      default:
        appName = 'Console Application';
        break;
    }

    var prompts = [{
      type: 'string',
      name: 'projectName',
      message: `What's the name of your ${appName}?`,
      default: 'ConsoleApplication1'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('Program.cs'),
      this.destinationPath('Program.cs'),
      {
        namespace: this.props.projectName  
      }
    );

    this.fs.copy(
      this.templatePath('project.json'),
      this.destinationPath('project.json')
    )
  },

  install: function () {
    //this.installDependencies();
  }
});
