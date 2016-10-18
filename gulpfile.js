const DEV_DIR = 'app'
const BUILD_DIR = 'build'
const DIST_DIR = 'dist'

var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var useref = require('gulp-useref')
var uglify = require('gulp-uglify')
var cssnano = require('gulp-cssnano')
var gulpIf = require('gulp-if')
var del = require('del')
var runSequence = require('run-sequence')

// === Cleaning

gulp.task('clean', () => {
    return del.sync([BUILD_DIR, DIST_DIR])
})

// === Development Tasks

gulp.task('default', (callback) => {
    runSequence('clean', 'watch')
})

gulp.task('watch', ['browserSync', 'pug', 'sass', 'js'], () => {
    gulp.watch(DEV_DIR + '/pug/**/*.pug', ['pug'])
    gulp.watch(DEV_DIR + '/scss/**/*.scss', ['sass'])
    gulp.watch(DEV_DIR + '/js/**/*.js', ['js'])
})

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: BUILD_DIR
        },
    })
})

// PUG -> HTML
gulp.task('pug', () => {
    return gulp.src(DEV_DIR + '/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(browserSync.reload({
            stream: true
        }))
})

// SCSS -> CSS
gulp.task('sass', () => {
    return gulp.src(DEV_DIR + '/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(BUILD_DIR + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

// Copy JavaScript from app/js to BUILD_DIR/js.
gulp.task('js', () => {
    return gulp.src(DEV_DIR + '/js/**/*.js')
        .pipe(gulp.dest(BUILD_DIR + '/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

//=== Production Task

gulp.task('build', (callback) => {
    runSequence('clean', ['pug', 'sass', 'js'], 'useref', callback)
})

// Carry HTML, optimized CSS and JavaScript from BUILD_DIR to DIST_DIR.
gulp.task('useref', () => {
    return gulp.src(BUILD_DIR + '/*.html')
        .pipe(useref()) // Gathering those files defined in HTML
        .pipe(gulpIf('*.js', uglify())) // Minifies JavaScript
        .pipe(gulpIf('*.css', cssnano())) // Minifies CSS
        .pipe(gulp.dest(DIST_DIR))
})
