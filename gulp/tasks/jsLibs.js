var gulp         = require('gulp');
var concat       = require('gulp-concat');
var config       = require('../config').jsLibs;
var handleErrors = require('../util/handleErrors');

gulp.task('jsLibs', function() {
  return gulp.src(config.src)
    .pipe(concat(config.bundleName))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});