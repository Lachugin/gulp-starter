const { watch, series, parallel } = require('gulp');
const { html } = require('./config/path');
const browserSync = require('browser-sync').create();

// конфигурация 
const path = require('./config/path');

// задачи
const clear = require('./task/clear');
const pug = require('./task/pug');
// const html = require('./task/html');
// const css = require('./task/css');
const scss = require('./task/scss');
const js = require('./task/js');

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
  // watch(path.html.watch, html).on('all', browserSync.reload);
  // watch(path.css.watch, css).on('all', browserSync.reload);
  watch(path.scss.watch, scss).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
}

// задачи
exports.pug = pug;
exports.scss = scss;
exports.js = js;

// сборка
exports.dev = series(
  clear,
  // parallel(html, css),
  // parallel(pug, css),
  parallel(pug, scss, js),
  parallel(watcher, server)
);