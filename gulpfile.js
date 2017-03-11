var gulp          = require('gulp')
var gutil         = require('gulp-util')
var sass          = require('gulp-sass')
var clean         = require('gulp-clean')
var sourcemaps    = require('gulp-sourcemaps')
var webpack       = require('webpack')
var WebpackServer = require('webpack-dev-server')

var webpackConfig = require('./webpack.config.js')
var sassPath = ['./scss/**/*.scss']
var distPath = './static/dist'

var IS_WATCHING = false

gulp.task('clean', function() {
  if(IS_WATCHING) return null

  return gulp.src('./static/dist/*', { read: false })
    .pipe(clean())
})

gulp.task('sass', function(cb) {
  return gulp.src(sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distPath))
})

gulp.task('webpack', function(cb) {
  webpack(webpackConfig, function(err, stats) {
    if(err) gutil.log(err.toString())
    gutil.log(stats.toString())
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

  server.listen(58080)
})

gulp.task('build', ['webpack', 'sass'])