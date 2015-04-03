var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;

//gulp.task('sass', ['images', 'imageResize', 'iconFont'], function () {
//gulp.task('sass', ['iconFont'], function () {
gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .on('error', handleErrors)
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write(config.sourcemapPath))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
