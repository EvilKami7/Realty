'use strict';
// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
/* global require */
/* eslint-disable indent */

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const plumber = require('gulp-plumber');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const ftp = require('vinyl-ftp');
const gutil = require('gulp-util');
const fs = require('fs');
const babel = require('gulp-babel');
const csso = require('gulp-csso');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const vinylPaths = require('vinyl-paths');
const del = require('del');
const sftp = require('gulp-sftp');
const runSequence = require('run-sequence');

// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------

const siteOutput = 'assets';

const paths = {
  sass: siteOutput + '/scss/**/*.scss',
  jsFolder: siteOutput + '/js/**/*',
  imgFolder: siteOutput + '/img/',
  iconsFolder: siteOutput + '/img/icons',
  fonts: siteOutput + '/fonts/*',
  css: '../web/css/',
  pages: siteOutput + '/pages/**/*.njk',
  templates: siteOutput + '/templates/**/*.njk',
  build: '../web/'
};

// -----------------------------------------------------------------------------
// SFTP Deploy
// -----------------------------------------------------------------------------

gulp.task('sftp', function () {
  const config = JSON.parse(fs.readFileSync('./ftp.json'));
  return gulp.src('assets/**/**')
    .pipe(sftp({
      host: 'hoster.uplinkweb.ru',
      port: 222,
      auth: 'keyboard-interactive',
      useKeyboardInteractive: true,
      user: config.hoster.user,
      pass: config.hoster.password,
      remotePath: config.hoster.path
    }));
});

gulp.task('deploy', function () {
  runSequence(['build-html', 'images', 'svg', 'fonts'],
    'scripts',
    'sftp');
});

// -----------------------------------------------------------------------------
// Rsync Deploy
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// FTP Deploy
// -----------------------------------------------------------------------------

gulp.task('ftp-deploy', ['sass', 'nunjucks'], function () {
  const config = JSON.parse(fs.readFileSync('./ftp.json'));
  const conn = ftp.create({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    parallel: 10,
    log: gutil.log
  });

  const globs = [
    siteOutput + '/js/**/*',
    siteOutput + '/img/**/*',
    siteOutput + '/css/**/*',
    siteOutput + '/fonts/*',
    siteOutput + '/*.html',
    siteOutput + '/video/**/*'
  ];

  const filePath = 'www/' + config.path + '/template';

  return gulp.src(globs, {
      base: 'assets',
      buffer: false
    })
    .pipe(conn.newerOrDifferentSize(filePath)) // only upload newer files
    .pipe(conn.dest(filePath));
});


// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

gulp.task('sass', function () {

  gulp.src([
    './assets/scss/balance.scss',
    './assets/scss/history.scss',
    './assets/scss/list-pdf.scss',
    './assets/scss/landing.scss',
    './assets/scss/pdf.scss',
    './assets/scss/login.scss',
    './assets/scss/error.scss',
    './assets/scss/main.scss',
    './assets/scss/object.scss',
    './assets/scss/objects.scss',
    './assets/scss/contacts.scss',
    './assets/scss/main.scss'
  ])
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 11'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(gulp.dest(paths.css));

});



// -----------------------------------------------------------------------------
// Images
// -----------------------------------------------------------------------------

gulp.task('sprite', function () {
  return gulp.src(paths.iconsFolder + '/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('icons.svg'))
    .pipe(gulp.dest(paths.iconsFolder));
});

gulp.task('images', function () {
  return gulp.src(paths.imgFolder + '/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(paths.build + '/img/'));
});

gulp.task('svg', function () {
  return gulp.src(paths.imgFolder + '/icons/**.svg')
    .pipe(svgmin())
    .pipe(gulp.dest(paths.build + '/img/icons/'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + '/fonts/'));
});


// -----------------------------------------------------------------------------
// Nunjucks
// -----------------------------------------------------------------------------

gulp.task('nunjucks', function () {
  return gulp.src(paths.pages)
    .pipe(plumber())
    /*        .pipe(data(function () {
                return require('./' + siteOutput + '/data.json')
            }))*/
    .pipe(nunjucksRender({path: [siteOutput + '/templates/']}))
    .pipe(gulp.dest(siteOutput));
});

gulp.task('nunjucks-watch', ['nunjucks'], function (done) {
  browserSync.reload();
  done();
});


// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------

gulp.task('scripts', function () {
  return gulp.src([paths.build + '/js/*.js', '!build/js/vendor.js'])
    .pipe(babel())
    .pipe(uglify())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest(paths.build + '/js'));
});

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']).on('change', browserSync.reload);
  gulp.watch([paths.pages, paths.templates], ['nunjucks-watch'], browserSync.reload);
  gulp.watch(paths.jsFolder).on('change', browserSync.reload);
});

// -----------------------------------------------------------------------------
// BrowserSync
// -----------------------------------------------------------------------------

gulp.task('server', ['sass'], function () {
  browserSync.init({server: siteOutput});
});

// -----------------------------------------------------------------------------
// Build
// -----------------------------------------------------------------------------

// gulp.task('build', ['sass', 'nunjucks', 'cssmin', 'images', 'scripts']);

gulp.task('cssmin', function () {
  return gulp.src(paths.css + '/main.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 11'],
      cascade: false
    }))
    .pipe(csso())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function () {
  return gulp.src(paths.build)
    .pipe(vinylPaths(del));
});

gulp.task('build-html', function () {
  return gulp.src(siteOutput + '/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', autoprefixer({
      browsers: ['last 2 versions', 'ie 11'],
      cascade: false
    })))
    .pipe(gulp.dest(paths.build));
});

gulp.task('build', function () {
  runSequence(['build-html', 'images', 'svg', 'fonts'],
    'scripts'
  );
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['server', 'sass', 'nunjucks', 'fonts', 'watch']);
