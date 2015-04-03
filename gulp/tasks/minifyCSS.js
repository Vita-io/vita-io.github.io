var gulp         = require('gulp');
var minifyCSS    = require('gulp-minify-css');
var uncss        = require('gulp-uncss');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').minifyCSS;

gulp.task('minifyCSS', ['sass', 'jekyll'], function() {
  return gulp.src(config.src)
    .pipe(uncss(config.uncss))
    .on('error', handleErrors)
    .pipe(minifyCSS(config.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .on('error', handleErrors);
});