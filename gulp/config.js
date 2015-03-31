var gutil = require('gulp-util');
var dest  = './src';
var src   = './assets';
var site  = './_site';
var bower = './bower_components';

var production = gutil.env._[0] === 'release';

var jsLibs = [
  bower + '/countUp/countUp.js',
  bower + '/skrollr/src/skrollr.js'];
//var closureLibs = jsLibs.slice(); // copy libs
//closureLibs.unshift(bower + '/jquery/dist/jquery.js');

module.exports = {
  production: production,
  serverport: 3000,
  browserSync: {
    server: {
      baseDir: [site]
    },
    files: [site + "/**",
            // exclude map files
            "!" + dest + "/**.map"]
  },
  sass: {
    src: src + "/sass/**/*.{scss,sass}",
    dest: dest + "/css",
    sourcemapPath: "./maps",
    settings: {
      outputStyle: production ? "compressed" : "nested",
      errLogToConsole: true,
      includePaths: [bower + "/foundation/scss"],
      imagePath: "/img"
    }
  },
  minifyCSS: {
    src: dest + "/css/*.css",
    dest: dest + "/css",
    settings: {
      advanced: true,
      aggressiveMerging: true,
      debug: production,
      keepBreaks: false,
      keepSpecialComments: 0, //* keeps all, 1 keeps first one only
      roundingPrecision: 2 //-1 disables rounding precission
    }
  },
  closure: {
    src: [//bower + '/closurelibrary/**/*.js',
          src + "/js/*.js"],
    dest: dest + "/js",
    settings: {
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: dest + '/js/app.min.js',
      compilerFlags: {
        compilation_level: 'ADVANCED_OPTIMIZATIONS', //'SIMPLE_OPTIMIZATIONS',
        //externs: closureLibs,
        //output_wrapper: '(function(){%output%})();',
        process_jquery_primitives: true
        //,warning_level: 'VERBOSE'
      },
      maxBuffer: 100000
    }
  },
  images: {
    src: src + "/img/*.{png,jpg,jpeg,gif}",
    dest: dest + "/img"
  },
  imageResize: {
    src: src + "/img/resize/**", //for watchify
    srcMap: src + "/img/resize/",
    dest: dest + "/img/",
    files: {
      //'logo': {file: 'vita-logo.png', height : 75, crop : false, upscale : false}
    }
  },
  jsLibs: {
    libs: jsLibs,
    bundleName: "libs.js",
    dest: dest + "/js/"
  }
};
