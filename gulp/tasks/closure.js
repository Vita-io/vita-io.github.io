var gulp            = require('gulp');
var closureCompiler = require('gulp-closure-compiler');
var browserSync     = require('browser-sync');
var handleErrors    = require('../util/handleErrors');
var config          = require('../config').closure;

gulp.task('closure', function() {
  return gulp.src(config.src)
    .pipe(closureCompiler(config.settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
    //.pipe(browserSync.reload({stream:true}));
});