const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');

// плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const pugs = require('gulp-pug');

// удаление директории
const clear = () => {
  return del('./public');
}

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

//  обработка pug
const pug = () => {
  return src('./src/pug/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(error =>({
        title: 'Pug',
        message: error.message
      }))
    }))
    .pipe(pugs())
    .pipe(dest('./public'))
    .pipe(browserSync.stream());
}

// наблюдение
const watcher = () => {
  watch('./src/pug/**/*.pug', pug);
}

// задачи
exports.pug = pug;
exports.watch = watcher;
exports.clear= clear;

// сборка
exports.dev = series(
  clear,
  html,
  parallel(watcher, server)
);