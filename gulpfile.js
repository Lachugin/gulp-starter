const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// конфигурация 
const path = require('./config/path');

// задачи
const clear = require('./task/clear');
const pug = require('./task/pug');
const html = require('./task/html');

// сервер
const server = () => {
  browserSync.init({
    server: {
        baseDir: path.root
    }
});
}

// наблюдение
const watcher = () => {
  watch(path.pug.watch, pug).on('all', browserSync.reload);
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