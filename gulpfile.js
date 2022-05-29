const { src, dest, watch, series, parallel } = require('gulp');

// плагины
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');


//  обработка HTML
const html = () => {
  return src('./src/html/*.html')
    .pipe(fileinclude())
    .pipe(size({title: 'До сжатия'}))
    .pipe(htmlmin( { collapseWhitespace: true } ))
    .pipe(size({title: 'После сжатия'}))
    .pipe(dest('./public'));
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
  watcher
);