var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var nodemon = require('gulp-nodemon');
var rename = require('gulp-rename');
var sh = require('shelljs');
var es = require('event-stream');

var paths = {
	sass: ['./src/sass/**/*.scss']
};

gulp.task('sass', function(done) {
	// www
	es.concat(
		gulp.src('./src/sass/www/style.scss')
			.pipe(sass({
				errLogToConsole: true
			}))
			.pipe(gulp.dest('./www/css'))
			.pipe(minifyCss({
				keepSpecialComments: 0
			}))
			.pipe(rename({ extname: '.min.css' }))
			.pipe(gulp.dest('./www/css/')),
		// mobile
		gulp.src('./src/sass/mobile/style.scss')
			.pipe(sass({
				errLogToConsole: true
			}))
			.pipe(gulp.dest('./mobile/www/css'))
			.pipe(minifyCss({
				keepSpecialComments: 0
			}))
			.pipe(rename({ extname: '.min.css' }))
			.pipe(gulp.dest('./mobile/www/css/'))
	).on('end', done);
});

gulp.task('nodemon', function () {
	nodemon({
		script: 'index.js',
		ext: 'js json',
		env: { 'NODE_ENV': 'development' }
	})
})

gulp.task('watch', function() {
	gulp.watch(paths.sass, ['sass']);
});


gulp.task('default', ['sass','watch','nodemon']);