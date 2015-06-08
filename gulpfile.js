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
	sass: ['./src/*/sass/**/*.scss'],
	jade: ['./src/*/jade/**/*.jade']
};

gulp.task('sass', function(done) {
	// www
	es.concat(
		gulp.src('./src/www/sass/style.scss')
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
		gulp.src('./src/mobile/sass/style.scss')
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


gulp.task('jade', function(done) {
	// TODO: get from config
	var YOUR_LOCALS = {
		mobile: {
			title: "Mobile App"
		},
		www: {
			title: "Web App"
		}
	};
	es.concat(
		gulp.src('./src/www/jade/**/*.jade')
			.pipe(jade({
				locals: YOUR_LOCALS,
				pretty: true
			}))
			.pipe(gulp.dest('./www/')),
		gulp.src('./src/mobile/jade/**/*.jade')
			.pipe(jade({
				locals: YOUR_LOCALS,
				pretty: true
			}))
			.pipe(gulp.dest('./mobile/www/'))
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
	gulp.watch(paths.jade, ['jade']);
});


gulp.task('default', ['sass','jade','watch','nodemon']);