var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()

gulp.task('watch', ['browserSync', 'pug', 'sass'], () => {
	gulp.watch('app/pug/**/*.pug', ['pug'])
	gulp.watch('app/scss/**/*.scss', ['sass'])
})

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	})
})

gulp.task('pug', () => {
	return gulp.src('app/pug/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

gulp.task('sass', () => {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
})
