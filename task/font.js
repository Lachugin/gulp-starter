const { src, dest } = require('gulp');

// конфигурация 
const path = require('../config/path');
const app = require('../config/app');


// плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');




//  обработка font
const font = () => {
  return src(path.font.src)
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: 'font',
        message: error.message
      }))
    }))
    .pipe(newer(path.font.dest))
    .pipe(dest(path.font.dest))
    .pipe(ttf2woff2())
    .pipe(dest(path.font.dest));
}

module.exports = font;