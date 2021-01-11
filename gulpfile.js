const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create()

// sass tasks
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }))
}

// JavaScript tasks
function jsTaks() {
  return src('app/js/script.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemaps: '.' }))
}

// browsersync tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    }
  })
  cb()
}

function browsersyncReleod(cb) {
  browsersync.reload()
  cb()
}

// watch tasks
function watchTask() {
  watch('*.html', browsersyncReleod)
  watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTaks, browsersyncReleod))
}

// default gul task
exports.default = series(
  scssTask,
  jsTaks,
  browsersyncServe,
  watchTask
)