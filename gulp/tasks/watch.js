/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp  = require('gulp');
var config= require('../config');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
  gulp.watch(config.jekyll.watch,    ['jekyll-rebuild']);
  gulp.watch(config.sass.src,        ['sass']);
  gulp.watch(config.images.src,      ['images']);
  gulp.watch(config.imageResize.src, ['imageResize']);
  gulp.watch(config.jsLibs.src,      ['jsLibs']);
  gulp.watch(config.closure.src,     ['closure']);
});
