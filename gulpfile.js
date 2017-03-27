const gulp          = require('gulp')
const gutil         = require('gulp-util')
const sass          = require('gulp-sass')
const clean         = require('gulp-clean')
const rename        = require('gulp-rename')
const cleanCSS      = require('gulp-clean-css')
const sourcemaps    = require('gulp-sourcemaps')
const autoprefixer  = require('gulp-autoprefixer')
const webpack       = require('webpack')
const WebpackServer = require('webpack-dev-server')
const compileGenres = require('./scripts/concat-genre-info')

const ENV           = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'
const PORT          = process.env.PORT || 58080
const WEBPACK_ENV   = ENV == 'production' ? 'prod' : 'dev'

console.log('NODE_ENV', ENV)

const webpackConfig = require('./webpack.config.' + WEBPACK_ENV + '.js')
const sassPath      = ['./scss/**/*.scss']
const distPath      = './static/dist'

let IS_WATCHING   = false

gulp.task('clean', function() {
  if(IS_WATCHING) return null

  return gulp.src('./static/dist/*', { read: false })
    .pipe(clean())
})

gulp.task('sass', function() {
  return gulp.src(sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['ie 11', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath))
})

gulp.task('sass-min', ['sass'], function() {
  return gulp.src(distPath + '/main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(distPath))
})

gulp.task('webpack', function(cb) {
  webpack(webpackConfig, function(err, stats) {
    if(err) gutil.log(err.toString())
    gutil.log(stats.toString())
    cb()
  })
})

gulp.task('compile-genre-info', function(cb) {
  compileGenres(function(err) {
    if(err) gutil.log(err.toString())
    cb()
  })
})

gulp.task('watch', ['sass'], function() {
  IS_WATCHING = true

  gulp.watch(sassPath, ['sass'])

  const compiler = webpack(webpackConfig)
  const server = new WebpackServer(compiler, {
    hot: true
  })

  server.listen(PORT)
})

gulp.task('build', ['sass', 'sass-min', 'webpack', 'compile-genre-info'])