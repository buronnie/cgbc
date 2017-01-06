import gulp       from 'gulp';
import gutil      from 'gulp-util';
import gulpif     from 'gulp-if';
import cache      from 'gulp-cached';
import changed    from 'gulp-changed';
import less       from 'gulp-less';
import flatten    from 'gulp-flatten';
import concat     from 'gulp-concat';
import uglify     from 'gulp-uglify';
import size       from 'gulp-size';
import csso       from 'gulp-csso';
import filter     from 'gulp-filter';
import concatCss  from 'gulp-concat-css';

import fs  from 'fs';
import del from 'del';

import vinylPaths   from 'vinyl-paths';
import browserSync  from 'browser-sync';
import sourcemaps   from 'gulp-sourcemaps';
import ngAnnotate   from 'gulp-ng-annotate';
import autoprefixer from 'gulp-autoprefixer';
import remember     from 'gulp-remember';

// Constants ----------------------------------------------------------
const ENV  = gutil.env.env || 'development';
const APPS = ['/'];
const SYNC = browserSync.create();
const PATH = {
  html:   [
    './src/**/*.html',
  ],
  fonts:  [
    './node_modules/bootstrap/fonts/**/*',
    './node_modules/font-awesome/fonts/**/*',
  ],
  assets:  [
    './node_modules/angular-ui-grid/*{svg,woff,ttf}'
  ],
  less:  [
    './src/common/app.less'
  ],
  css: [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap-slider/css/bootstrap-slider.css',
    './node_modules/angular-ui-grid/ui-grid.css'
  ],
  js: [
    './src/**/*.js',
  ],
  vendor: [
    './node_modules/moment/moment.js',
    './node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/angular-*/angular-*.js',
    './node_modules/angular-filter/dist/angular-filter.js',
    './node_modules/angular-ui-grid/ui-grid.js',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    './node_modules/angular-breadcrumb/dist/angular-breadcrumb.js',

    './node_modules/angularjs-rails-resource/vendor/assets/javascripts/angularjs/rails/resource/*.js',
    './node_modules/angularjs-rails-resource/vendor/assets/javascripts/angularjs/rails/resource/utils/*.js',
    './node_modules/angular-loading-bar/build/loading-bar.js',
    './node_modules/bootstrap-slider/js/*.js',

    '!**/*.min.js',
    '!**/*_test.js',
  ],
  watch:  [
    './src/**',
  ],
  build: './build',
  dist:  '../public/',
}

// Helpers ------------------------------------------------------------

function performChain(name, src, dst, callback) {
  let chain = gulp.src(src);

  if (callback) {
    chain = callback(chain);
  }

  return chain
      .pipe(gulp.dest(dst));
}

function performBuild(name, ext, src, dst, callback) {
  return performChain(name, src, dst, function(chain) {
    chain = chain
        .pipe(changed(dst, {extension: '.'+ext}))
        .pipe(sourcemaps.init());

    if (callback) {
      chain = callback(chain)
    }

    return chain
        .pipe(sourcemaps.write('.'))
        .pipe(SYNC.reload({stream: true}));
  });
}

function multiTask(name, cb) {
  let subtasks = [];
  APPS.forEach((app) => {
    let subname = name+"["+app+"]";
    gulp.task(subname, function() { return cb(app); });
    subtasks.push(subname);
  });

  return gulp.task(name, gulp.parallel(...subtasks));
};

// Copy tasks ---------------------------------------------------------

gulp.task('copy.fonts', function() {
  return performChain('fonts', PATH.fonts, PATH.build+"/fonts", (chain) => {
    return chain.pipe(flatten());
  });
});

gulp.task('copy.assets', function() {
  return performChain('assets', PATH.assets, PATH.build+"/assets", (chain) => {
    return chain.pipe(flatten());
  });
});

gulp.task('copy.js', function() {
  return performChain('js', PATH.js, PATH.build+"/", (chain) => {
    return chain.pipe(concat('app.js'));
  });
});

gulp.task('copy.vendor', function() {
  return performChain('vendor', PATH.vendor, PATH.build+"/assets", (chain) => {
    return chain.pipe(concat('vendor.js'));
  });
});

// Build tasks --------------------------------------------------------

gulp.task('build.less', function() {
  const opts = {
    paths: [".", "./node_modules"],
    compress: false,
  };

  return performBuild('less', 'css', PATH.less, PATH.build+"/assets", (chain) => {
    let noop = gutil.noop;
    return chain
        .pipe(less(opts))
        .pipe(autoprefixer());
  });
});

gulp.task('build.css', function() {
  return performChain('css', PATH.css, PATH.build+"/assets", (chain) => {
    //let noop = gutil.noop;
    return chain
        .pipe(autoprefixer());
  });
});

gulp.task('concat.css', function() {
  return gulp.src(PATH.build+'/assets/**/*.css')
      .pipe(concatCss('app.css'))
      .pipe(gulp.dest(PATH.build+'/assets/'));
});

gulp.task('build.html', function() {
  const opts = {
    pretty: true,
  };

  return performBuild('html', 'html', PATH.html, PATH.build, (chain) => {
    return chain
        .pipe(gutil.noop())
        .pipe(filter((file) => {
          return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }));
  });
});

// Misc tasks --------------------------------------------------------

gulp.task('clean.build', function() {
  return gulp.src(PATH.build + "*/").pipe(vinylPaths(del));
});

gulp.task('clean.dist', function() {
  return gulp.src(PATH.dist + "*/").pipe(vinylPaths(del));
});

gulp.task('serve', function(cb) {
  return SYNC.init({
    open:       false,
    ui:         false,
    notify:     false,
    ghostMode:  false,
    port:       3000,
    server: {
      baseDir: [PATH.build],
    },
  }, cb);
});

gulp.task('minify', function() {
  return gulp.src([
    './build/**',
    '!./build/**/*.map',
  ])
      // .pipe(gulpif(/[.]js$/, ngAnnotate()))
      // .pipe(gulpif(/[.]js$/, uglify()))
      // .pipe(gulpif(/[.]css$/, csso()))
      .pipe(size())
      .pipe(gulp.dest(PATH.dist));
});

// Combos -------------------------------------------------------------

gulp.task('clean', gulp.parallel('clean.build', 'clean.dist'));
gulp.task('prebuild', gulp.parallel('build.html', 'build.less', 'build.css', 'copy.fonts', 'copy.assets', 'copy.js' , 'copy.vendor'));
gulp.task('build', gulp.series('prebuild', 'concat.css'));
gulp.task('rebuild', gulp.series('clean.build', 'build'));
gulp.task('dist', gulp.series('rebuild', 'minify'));
gulp.task('watch', function() {
  return gulp.watch(PATH.watch, gulp.series('build'));
});
gulp.task('run', gulp.series('rebuild', gulp.parallel('serve', 'watch')));
gulp.task('default', gulp.series('run'));
gulp.task('deploy', gulp.series('dist'));
