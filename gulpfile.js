const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');

// сервер
const server = () => {
  browserSync.init({
    server: {
        baseDir: "./public"
    }
});
}


//  обработка HTML
const html = () => {
  return src('./src/html/*.html')
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: 'HTML',
        message: error.message
      }))
    }))
    .pipe(fileinclude())
    .pipe(size({title: 'До сжатия'}))
    .pipe(htmlmin( { collapseWhitespace: true } ))
    .pipe(size({title: 'После сжатия'}))
    .pipe(dest('./public'))
    .pipe(browserSync.stream());
}

// наблюдение
const watcher = () => {
  watch('./src/html/**/*.html', html);
}

// задачи
exports.html = html;
exports.watch = watcher;

// сборка
exports.dev = series(
  html,
  parallel(watcher, server)
);