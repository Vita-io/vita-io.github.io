var gutil      = require('gulp-util');
var runSequence= require('run-sequence');

var src           = './src';
var output        = '.';
var bower         = './bower_components';
var jekyllOutput  = './_site';

global.production = gutil.env._[0] === 'release';

// order of build tasks; remove the tasks you don't want
var defaultTasks  = [
  'svg'
 ,'sass'
 ,'mergeJS'
 ,'resizeImages'
 ,'compressImages'
 ,'jekyll'
];

global.config = {
  // remove to disable browserSync support
  browserSync: {
    server: {
      baseDir: [jekyllOutput]
    },
    port: 3000,
    files: [jekyllOutput + "/**"]
  },

  defaultTasks: defaultTasks,
  build: function(cb) {
    runSequence(
      'delete'
     ,defaultTasks
     ,cb);
  },
  // order of release tasks; remove the tasks you don't want
  release: [
    'build'
   ,'compressJS'
   ,'compressHTML'
   ,'compressCSS'
  ],
};

global.config.tasks = []; // will store configuration per task


//
// copy
//

// global.config.tasks.copy = {
//   deps: ['delete'],
//   reloadPage: false,

//   src:  [], // files/dirs to copy
//   dest: output
// };



//
// resizeImages
//

global.config.tasks.resizeImages = {
  deps: [],
  reloadPage: false,

  src: src + "/img/resize/**",
  srcMap: src + "/img/resize/",
  dest: output + "/img/",
  files: {
    //'logo': {file: 'vita-logo.png', height : 75, crop : false, upscale : false}
  }
};



//
// iconFont
//

// global.config.tasks.iconFont = {
//   deps: [],
//   reloadPage: true,
//   src: src + "/fonts/*.svg",
//   dest: output + "/fonts/",
//   settings: {
//     fontName: 'vitaIcons',
//     appendCodepoints: true,
//     normalize: true
//   },
//   css: {
//     src: src + '/fonts/_vita-icons.scss',
//     dest: src + '/sass',
//     fontPath: '../fonts/'
//   }
// };


//
// mergeJS
//

global.config.tasks.mergeJS = {
  deps: [],
  reloadPage: true,

  src: [src + '/js/module.js', bower + '/countUp/countUp.js', bower + '/skrollr/src/skrollr.js', src + '/js/app.js'],
  bundleName: "app.min.js",
  dest: output + "/js/"
};



//
// svg
//

global.config.tasks.svg = {
  deps: [],
  reloadPage: false,

  src: src + "/img/**/*.svg",
  dest: output + "/img",
  settings: {
    plugins: [
       {cleanupAttrs: false}      // also removes class/id!
      ,{mergePaths: false}
      ,{removeUselessDefs: false}
      ,{cleanupIDs: false}
      ,{removeHiddenElems: false} // also removes opacity=0!
    ]
  }
};



//
// sass
//

var browsers = ['ie >= 9',
                'last 3 Chrome versions',
                'last 3 Firefox versions',
                'last 2 Safari versions',
                'last 2 Opera versions',
                'last 2 ChromeAndroid versions',
                'last 2 FirefoxAndroid versions',
                'last 2 ExplorerMobile versions',
                'last 2 OperaMobile versions',
                'last 2 ios_saf versions'
                ];

global.config.tasks.sass = {
  deps: [],
  reloadPage: false,

  src: src + "/sass/**/*.{scss,sass}",
  dest: output + "/css",
  sourcemapPath: "./maps",
  settings: {
    outputStyle: global.production ? "compressed" : "nested",
    errLogToConsole: true,
    precission: 3,
    includePaths: [bower + "/foundation/scss"]
  },
  autoprefixer: {
    browsers: browsers,
    cascade: false,
    remove: true /* remove unneeded prefixes */
  },
  /* media query merger */
  mqpakcer: {
    sort: false /* auto sort queries on min-width size? */
  },
  doiuse: {
    browsers: browsers,
    onFeatureUsage: function(usageInfo) { console.log(usageInfo.message); }
  }
};



//
// compressCSS
//

global.config.tasks.compressCSS = {
  deps: ['sass', 'compressHTML', 'jekyll'],
  reloadPage: false,

  src: output + "/css/*.css",
  dest: output + "/css",

  /* uncss removes unused css-statements by looking at certain html files */
  uncss: {
    enabled: true,
    html: [jekyllOutput + '/**/*.html'],
    ignore: [ // add rules to keep specific css
      '#top-opening #slogan .rotate',
      '#top-opening #slogan .rotate.active',
      /input:[:a-z-]+\-placeholder/
    ]
  },
  minify: {
    radical: true
  }
};



//
// compressHTML
//

global.config.tasks.compressHTML = {
  deps: [],
  reloadPage: true,

  src: [src + "/**/*.html"],
  dest: output,
  opts: {quotes: true}
};



//
// compressJS
//

global.config.tasks.compressJS = {
  deps: ['mergeJS'],
  reloadPage: true,

  src: [output + "/js/app.min.js"],
  dest: output + "/js",
  settings: {
    compilerPath: bower + '/closure-compiler/compiler.jar',
    fileName: 'app.min.js',
    compilerFlags: {
      compilation_level: 'SIMPLE_OPTIMIZATIONS' // 'ADVANCED_OPTIMIZATIONS'
      ,warning_level: 'VERBOSE'
    //,formatting: "PRETTY_PRINT"
    },
    maxBuffer: 100000
  }
};



//
// compressImages
//

global.config.tasks.compressImages = {
  deps: [],
  reloadPage: false,

  src:  src + "/img/*.{png,jpg,jpeg,gif}",
  dest: output + "/img",
  settings: {
    optimizationLevel: 5, // for PNG, between 0-7; the higher the number, the more trials but slower it is
    progressive: true,    // JPG; lossless conversion to progressive
    interlaced: false,    // GIF; interlace GIF for progressive rendering
    multipass: false      // SVG, optimize SVG until it's fully optimized
  }
};



//
// jekyll
//

global.config.tasks.jekyll = {
  deps: [],
  reloadPage: false,

  src:    output,
  dest:   jekyllOutput,
  config: '_config.yml',
  watch: [
     '_config.yml'
    ,'_config.build.yml'
    ,output + '/_data/**/*.{json,yml,csv}'
    ,output + '/_includes/**/*.{html,xml,svg}'
    ,output + '/_layouts/*.html'
    ,output + '/index.html'
    ,output + '/_*/**/*.{markdown,md,yml,json,txt,xml}'
    ,output + '/img/*.{png,jpg,jpeg,gif,svg}'
    ,output + '/css/*.css'
    ,output + '/js/*.js'
  ]
};



//
// Don't edit after this line!
//

var requireDir = require('require-dir');
var gulpFolder = "node_modules/vita-gulp";

// Require all tasks in gulp/tasks, including subfolders
requireDir(gulpFolder + '/gulp/tasks', { recurse: true });
