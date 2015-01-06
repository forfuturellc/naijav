var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
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
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});


// task: checks if git is installed
gulp.task('git-check', function(done) {
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
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});


// task: watches changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});


// task: the default task
gulp.task('default', ['sass']);
