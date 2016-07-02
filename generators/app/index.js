'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the .NET Core generator!'
    ));

    var prompts = [{
      type: 'string',
      name: 'projectName',
      message: 'Console application name',
      default: "ConsoleApplication1"
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
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
