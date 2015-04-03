var gulp         = require('gulp');
var svgmin       = require('gulp-svgmin');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').svg;

gulp.task('svg', function() {
  return gulp.src(config.src)
    .pipe(svgmin(config.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
