var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  runSequence(
      'delete'
    , ['minifyHTML', 'sass', 'closure', 'imageResize', 'images']
    , 'jekyll'
    , callback);
});
