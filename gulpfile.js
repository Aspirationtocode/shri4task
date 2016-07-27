var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		jade         = require('gulp-jade'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');
		babel        = require('gulp-babel');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./www"
				},
				notify: false
		});
		
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('www/css'))
	.pipe(browserSync.stream());
});


gulp.task('jade', function() {
	return gulp.src('jade/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('www'));
});

gulp.task('babel', () => {
	return gulp.src('js_es6/www/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('www/js'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./www/libs/jquery/jquery-1.9.1.min.js',
		'./www/libs/hammerjs/hammer.js',
		'./www/libs/hammerjs/jquery.hammer.js',
		'./www/libs/jquery/jquery-ui-1.10.3.min.js'
		// './www/libs/jquery-mobile/jquery-mobile-1.4.5.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./www/js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('jade/*.jade', ['jade']);
	gulp.watch('www/libs/**/*.js', ['scripts']);
	gulp.watch('js_es6/www/*.js', ['babel']);
	gulp.watch('www/js/*.js').on("change", browserSync.reload);
	gulp.watch('www/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
