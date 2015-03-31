var gulp    = require('gulp');
var concat  = require('gulp-concat');
var config  = require('../config').jsLibs;

//the third-party libs like Three.js, TweenLite, etc.
gulp.task('jsLibs', function() {
   return gulp.src(config.libs)
     .pipe(concat(config.bundleName))
     .pipe(gulp.dest(config.dest));
});