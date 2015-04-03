var gutil         = require('gulp-util');
var jekyllSrc     = '.';
var src           = './src';
var jekyllOutput  = './_site';
var bower         = './bower_components';

var production    = gutil.env._[0] === 'release';

var jsLibs = [
  src + '/js/module.js'
  ,bower + '/countUp/countUp.js'
  ,bower + '/skrollr/src/skrollr.js'
  ,src + '/js/app.js'];
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
       '_config.yml'
      ,'_config.build.yml'
      ,jekyllSrc + '/_data/**/*.{json,yml,csv}'
      ,jekyllSrc + '/_includes/**/*.{html,xml,svg}'
      ,jekyllSrc + '/_layouts/*.html'
      ,jekyllSrc + '/vacancies/index.html'
      ,jekyllSrc + '/index.html'
      ,jekyllSrc + '/_*/**/*.{markdown,md,yml,json,txt,xml}'
      ,jekyllSrc + '/img/*.{png,jpg,jpeg,gif,svg}'
      ,jekyllSrc + '/css/*.css'
      ,jekyllSrc + '/js/*.js'
    ]
  },
  delete: {
    src: [jekyllSrc + "/img", jekyllSrc + "/js", jekyllSrc + "/css", jekyllSrc + "/_includes", jekyllSrc + "/_layouts"]
  },
  sass: {
    src: src + "/sass/**/*.{scss,sass}",
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
    uncss: {
      html: [jekyllOutput + '/**/*.html'],
      ignore: ['#top-opening #slogan .rotate.active', /input:[:a-z-]+\-placeholder/]
    },
    settings: {
      advanced: true,
      aggressiveMerging: true,
      debug: production,
      keepBreaks: false,
      keepSpecialComments: 0, //* keeps all, 1 keeps first one only
      roundingPrecision: 2 //-1 disables rounding precission
    }
  },
  minifyHTML: {
    src: [src + "/**/*.html"],
    dest: jekyllSrc,
    opts: {quotes: true}
  },
  closure: {
    src: [//bower + '/closurelibrary/**/*.js',
          jekyllSrc + "/js/app.js"],
    dest: "",
    settings: {
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: jekyllSrc + '/js/app.min.js',
      compilerFlags: {
        compilation_level: 'SIMPLE_OPTIMIZATIONS' // 'ADVANCED_OPTIMIZATIONS'
        ,warning_level: 'VERBOSE'
        //,formatting: "PRETTY_PRINT"
      },
      maxBuffer: 100000
    }
  },
  images: {
    src: src + "/img/*.{png,jpg,jpeg,gif}",
    dest: jekyllSrc + "/img"
  },
  imageResize: {
    src: src + "/img/resize/**", //for watchify
    srcMap: src + "/img/resize/",
    dest: jekyllSrc + "/img/",
    files: {
      //'logo': {file: 'vita-logo.png', height : 75, crop : false, upscale : false}
    }
  },
  jsLibs: {
    src: jsLibs,
    bundleName: "app.js",
    dest: jekyllSrc + "/js/"
  },
  svg: {
    src: src + "/_includes/**/*.svg",
    dest: jekyllSrc + "/_includes",
    settings: {
      plugins: [
         {cleanupAttrs: false} /* keep class/ids! */
        ,{mergePaths: false} /* too aggressive in people-money-svg */
        ,{removeUselessDefs: false} /* keep defs in top-plx-container.svg */
        ,{cleanupIDs: false}
        ,{removeHiddenElems: false} /* also removes opacity=0 in people-money.svg */
      ]
    }
  }
};
