const { src, dest } = require('gulp');

// конфигурация 
const path = require('../config/path');


// плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cssimport = require('gulp-cssimport');
const cautoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const size = require('gulp-size');
const shorthand = require('gulp-shorthand');
const gcmq = require('gulp-group-css-media-queries');
const webpCss = require('gulp-webp-css');


//  обработка css
const css = () => {
  return src(path.css.src, {sourcemaps: true})
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: 'Css',
        message: error.message
      }))
    }))
    .pipe(concat('main.css'))
    .pipe(cssimport())
    .pipe(webpCss())
    .pipe(cautoprefixer())
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(size({title: 'До сжатия css'}))
    .pipe(dest(path.css.dest, {sourcemaps: true}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(size({title: 'После сжатия css.min'}))
    .pipe(dest(path.css.dest, {sourcemaps: true}));
}

module.exports = css;