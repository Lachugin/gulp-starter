const { src, dest } = require('gulp');

// конфигурация 
const path = require('../config/path');
const app = require('../config/app');


// плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pugs = require('gulp-pug');
const webpHtml = require('gulp-webp-html');


//  обработка pug
const pug = () => {
  return src(path.pug.src)
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: 'Pug',
        message: error.message
      }))
    }))
    .pipe(pugs(app.pug.pretty))
    .pipe(webpHtml())
    .pipe(dest(path.pug.dest));
}

module.exports = pug;