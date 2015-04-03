var gulp = require('gulp');

gulp.task('release', ['build', 'minifyCSS']);
//gulp.task('release', ['build']);
