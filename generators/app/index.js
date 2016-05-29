'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('appname', {type: String, required: false});

    this.option('skip-install', {
        desc: 'Whether dependencies should be installed',
        defaults: false
    });

    this.sourceRoot(path.join(path.dirname(this.resolved), 'templates'));
  },

  initialization: function () {
    this.log(yosay(
        'Welcome to Adam Stephenson\'s ' + chalk.yellow('Visual Studio Code Node-TypeScript') + ' generator!'
    ));

    var done = this.async();

    var dirname = path.basename(process.cwd());
    this.appname = _.kebabCase(dirname);

    var prompts = [
        {
            type: 'input',
            name: 'appname',
            message: 'Application Name (' + chalk.yellow(this.appname) + ')'
        }
    ];

    this.prompt(prompts, function (props) {
        this.appname = props.appname || this.appname;
        done();
    }.bind(this));
  },

  writing: {
        project: function () {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
            appname: this.appname
            });
        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            {
                appname: this.appname
            });
        },
        files: function () {
            this.copy('editorconfig', '.editorconfig');
            this.copy('gitattributes', '.gitattributes');
            this.copy('gitignore', '.gitignore');
            this.copy('jscsrc', '.jscsrc');
            this.copy('jshintrc', '.jshintrc');
            this.copy('travis.yml', '.travis.yml');
            this.copy('_gulp.config.js', 'gulp.config.js');
            this.copy('_gulpfile.js', 'gulpfile.js');
            this.copy('_karma.conf.js', 'karma.conf.js');
            this.copy('_LICENSE', 'LICENSE');
            this.copy('_SpecRunner.html', 'SpecRunner.html');
            this.copy('_typings.json', 'typings.json');
            this.copy('_tslint.json', 'tslint.json');
            this.copy('_tsconfig.json', 'tsconfig.json');
        },
        directories: function () {
            this.directory('vscode', '.vscode');
            this.directory('_lib', 'lib');
            this.directory('_src', 'src');
            this.directory('_util', 'util');
            this.directory('_typings', 'typings');
        }
    },

    install: {
        npmInstall: function () {
            var generator = this;
            generator.npmInstall(null, { skipInstall: this.options['skip-install'] }, function () {
                generator.spawnCommandSync('npm', ['install', '-g', 'typings'])
                generator.spawnCommandSync('typings', ['install'])
            });
        }
    },

    end: function () {
        this.log(chalk.yellow.bold('Installation successful!'));
    }
});