const { watch, series, parallel } = require('gulp');
const { html } = require('./config/path');
const browserSync = require('browser-sync').create();

// конфигурация 
const path = require('./config/path');
const app = require('./config/app');

// задачи
const clear = require('./task/clear');
const pug = require('./task/pug');
// const html = require('./task/html');
// const css = require('./task/css');
const scss = require('./task/scss');
const js = require('./task/js');
const img = require('./task/img');
const font = require('./task/font');

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
  watch(path.img.watch, img).on('all', browserSync.reload);
  watch(path.font.watch, font).on('all', browserSync.reload);
}

const build = series(
  clear,
  parallel(pug, scss, js, img, font)
);

const dev = series(
  build,
  parallel(watcher, server)
);

// задачи
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

// сборка
exports.default = app.isProd ? build : dev;
