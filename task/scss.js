const { src, dest } = require('gulp');

// конфигурация 
const path = require('../config/path');
const app = require('../config/app');


// плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const cautoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const size = require('gulp-size');
const shorthand = require('gulp-shorthand');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const webpCss = require('gulp-webp-css');


//  обработка scss
const scss = () => {
  return src(path.scss.src, {sourcemaps: app.isDev})
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: 'scss',
        message: error.message
      }))
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(webpCss())
    .pipe(cautoprefixer())
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(size({title: 'До сжатия css'}))
    .pipe(dest(path.scss.dest, {sourcemaps: app.isDev}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(size({title: 'После сжатия css.min'}))
    .pipe(dest(path.scss.dest, {sourcemaps: app.isDev}));
}

module.exports = scss;