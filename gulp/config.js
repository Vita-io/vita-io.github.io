var gutil         = require('gulp-util');
var jekyllSrc     = './src';
var assets        = './assets';
var jekyllOutput  = './_site';
var bower         = './bower_components';

var production    = gutil.env._[0] === 'release';

var jsLibs = [
  assets + '/js/module.js'
  ,bower + '/countUp/countUp.js'
  ,bower + '/skrollr/src/skrollr.js'
  ,assets + '/js/app.js'];
//var closureLibs = jsLibs.slice(); // copy libs
//closureLibs.unshift(bower + '/jquery/dist/jquery.js');

module.exports = {
  production: production,
  browserSync: {
    server: {
      baseDir: [jekyllOutput]
    },
    port: 3000,
    files: [jekyllOutput + "/**",
            // exclude map files
            "!" + jekyllSrc + "/**.map"]
  },
  jekyll: {
    src:    jekyllSrc,
    dest:   jekyllOutput,
    config: '_config.yml',
    watch: [
      '_config.yml',
      '_config.build.yml',
      jekyllSrc + '/_data/**/*.{json,yml,csv}',
      jekyllSrc + '/_includes/**/*.{html,xml}',
      jekyllSrc + '/_layouts/*.html',
      jekyllSrc + '/_plugins/*.rb',
      jekyllSrc + '/_posts/*.{markdown,md}',
      jekyllSrc + '/**/*.{html,markdown,md,yml,json,txt,xml}',
      jekyllSrc + '/**/*.{js,css,png,jpg,jpeg,gif,svg}'
    ]
  },
  delete: {
    src: [jekyllSrc + "/img", jekyllSrc + "/js", jekyllSrc + "/css"]
  },
  sass: {
    src: assets + "/sass/**/*.{scss,sass}",
    dest: jekyllSrc + "/css",
    sourcemapPath: "./maps",
    settings: {
      outputStyle: production ? "compressed" : "nested",
      errLogToConsole: true,
      includePaths: [bower + "/foundation/scss"],
      imagePath: "/img"
    }
  },
  minifyCSS: {
    src: jekyllSrc + "/css/*.css",
    dest: jekyllSrc + "/css",
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
          jekyllSrc + "/js/app.js"],
    dest: "",
    settings: {
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: jekyllSrc + '/js/app.min.js',
      compilerFlags: {
        compilation_level: 'ADVANCED_OPTIMIZATIONS', //'SIMPLE_OPTIMIZATIONS',
        //externs: closureLibs,
        //output_wrapper: '(function(){%output%})();',
        process_jquery_primitives: true
        ,warning_level: 'VERBOSE'
      },
      maxBuffer: 100000
    }
  },
  images: {
    src: assets + "/img/*.{png,jpg,jpeg,gif}",
    dest: jekyllSrc + "/img"
  },
  imageResize: {
    src: assets + "/img/resize/**", //for watchify
    srcMap: assets + "/img/resize/",
    dest: jekyllSrc + "/img/",
    files: {
      //'logo': {file: 'vita-logo.png', height : 75, crop : false, upscale : false}
    }
  },
  jsLibs: {
    src: jsLibs,
    bundleName: "app.js",
    dest: jekyllSrc + "/js/"
  }
};
