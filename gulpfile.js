'use static';

const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const streamify = require('gulp-streamify');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const watchify = require('watchify');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const imagemin = require('gulp-imagemin');
const nodemon = require('nodemon');
const del = require('del');

const production = process.env.NODE_ENV || 'production';

const config = {
  src: {
    jsPath: 'client/src/js/',
    imgPath: 'client/src/img/',
    cssPath: 'client/src/css/',
  },
  dest: {
    jsPath: 'client/dest/js',
    imgPath: 'client/dest/img',
    cssPath: 'client/dest/css',
  },
};

// 准备需要提前预编译的依赖包
const dependencies = [
  'react',
  'redux',
  'react-router',
  'react-redux',
  'redux-actions',
  'redux-promise',
  'react-dom',
];

// 其他不适用import进行导入的依赖包进行合并并压缩
gulp.task('vendor', () => {
  return gulp.src([

  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest(config.dest.jsPath));
});

// 把需要提前进行预编译的依赖包进行编译
gulp.task('browserify-vendor', () => {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest(config.dest.jsPath));
});

// 编译手写的代码
gulp.task('browserify', () => {
  return browserify(path.join(config.src.jsPath, 'main.js'))
    .external(dependencies) // 忽略提前编译的依赖包
    .transform(babelify) // es6翻译成es5
    .bundle() // 打包代码
    .pipe(source('bundle.js')) // 打包名称未bundle.js
    .pipe(gulpif(production, streamify(uglify({ mangle: false }))))
    .pipe(gulp.dest(config.dest.jsPath));
});

// 当手写代码更新时，重新编译代码
gulp.task('browserify-watch', ['browserify-vendor'], () => {
  const opts = Object.assign({}, watchify.args, { debug: true });
  const bundler = watchify(browserify(path.join(config.src.jsPath, 'main.js'), opts));
  bundler.external(dependencies);
  bundler.transform(babelify);
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    const start = Date.now();
    return bundler.bundle()
      .on('error', (err) => {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', () => {
        const now = Date.now();
        // gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start  'ms.'));
        gutil.log(gutil.colors.green('Finished rebundling in', `${now - start} ms.`));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(config.dest.jsPath))
      .pipe(livereload());
  }
});

// 编译less
gulp.task('styles', () => {
  return gulp.src(path.join(config.src.cssPath, 'main.less'))
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest(path.join(config.dest.cssPath)))
    .pipe(livereload());
});

// 压缩图片
gulp.task('imagemin', () => {
  return gulp.src(path.join(config.src.imgPath, '*'))
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(config.dest.imgPath)));
});

// 侦听变化并编译
gulp.task('watch', () => {
  gulp.watch(path.join(config.src.cssPath, '**/*.less'), ['styles']);
});

// 删除client/dest下面处理过的文件
gulp.task('del', () => {
  // del(['client/dest/js/**', 'client/dest/css/**']).then(paths => {
  del([path.join(config.dest.jsPath, '**'), path.join(config.dest.cssPath, '**')]).then(paths => {
    console.log(`Deleted files and folders:\n`, paths.join('\n'));
  });
});

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    verbose: true,
    script: './app.js',
    ext: 'js html',
    ignore: ['client', 'tmp'],
    stdout: false,
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed('./app');
        livereload.changed('./config');
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'styles',
  'imagemin',
  'vendor',
  'browserify-watch',
  'watch',
  'develop',
]);

gulp.task('build', [
  'styles',
  'imagemin',
  'vendor',
  'browserify-vendor',
  'browserify',
]);
