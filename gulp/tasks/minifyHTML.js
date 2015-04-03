var gulp         = require('gulp');
var minifyHTML   = require('gulp-minify-html');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').minifyHTML;

gulp.task('minifyHTML', function() {
  return gulp.src(config.src)
    .pipe(minifyHTML(config.opts))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});