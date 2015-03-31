var gulp         = require('gulp');
var minifyCSS    = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').minifyCSS;

gulp.task('minifyCSS', ['sass'], function() {
  return gulp.src(config.src)
    .pipe(minifyCSS(config.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .on('error', handleErrors);
});