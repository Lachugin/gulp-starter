const { src, dest } = require('gulp');

// конфигурация 
const path = require('../config/path');
const app = require('../config/app');


// плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');




//  обработка img
const img = () => {
  return src(path.img.src)
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: 'Img',
        message: error.message
      }))
    }))
    .pipe(newer(path.img.dest))
    .pipe(imagemin(app.imagemin))
    .pipe(dest(path.img.dest));
}

module.exports = img;