/**
* Gulp, task runner
* Copyright (C) 2015  Forfuture LLC <we@forfuture.co.ke>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License along
* with this program; if not, write to the Free Software Foundation, Inc.,
* 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/


var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var lodash = require("lodash");
var sh = require('shelljs');


// gulp plugins
var concat = require('gulp-concat');
var jshint = require("gulp-jshint");
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');


// Paths used repeatedly
var paths = {
  js: ["www/js/*.js"],
  sass: ['./scss/**/*.scss']
};


// task: installs gulp
gulp.task('install', ['git-check'], function() {
  "use strict";

  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});


// task: checks if git is installed
gulp.task('git-check', function(done) {
  "use strict";

  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


// task: compiles sass into css
gulp.task('sass', function(done) {
  "use strict";

  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


// task: hints javascript files
gulp.task("jshint", function() {
  "use strict";

 gulp.src(lodash.flatten(["gulpfile.js", paths.js]))
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});


// task: watches changes
gulp.task('watch', function() {
  "use strict";

  gulp.watch(paths.sass, ['sass']);
});


// task: the default task
gulp.task('default', ['sass']);


// task: runs tests
gulp.task("test", ["jshint"]);
