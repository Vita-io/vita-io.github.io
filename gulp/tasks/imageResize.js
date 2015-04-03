//var changed     = require('gulp-changed');
var gulp        = require('gulp');
var changed     = require('gulp-changed');
var imageResize = require('gulp-image-resize');
var imagemin    = require('gulp-imagemin');
var config      = require('../config').imageResize;
var handleErrors = require('../util/handleErrors');

var tasks = [];
var names = Object.keys(config.files);

names.forEach(function(name) {
  var taskName = 'resize-'+name;
  var conf = config.files[name];

  gulp.task(taskName, function () {
    gulp.src(config.srcMap + conf.file)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imageResize(conf))
    .on('error', handleErrors)
    .pipe(imagemin()) // Optimize
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
  });

  tasks.push(taskName);
});

gulp.task("imageResize", tasks);
