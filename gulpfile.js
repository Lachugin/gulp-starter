const { src, dest } = require("gulp");

// плагины
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');


//  обработка HTML
const html = () => {
  return src("./src/html/*.html")
    .pipe(fileinclude())
    .pipe(htmlmin( { collapseWhitespace: true } ))
    .pipe(dest("./public"));
}

// задачи
exports.html = html