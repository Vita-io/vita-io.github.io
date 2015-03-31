var gulp = require('gulp');

gulp.task('build', ['jsLibs', 'closure', 'imageResize', 'images', 'sass']);
