(function() {
	'use strict';
	
	var gulp = require('gulp');
	var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	var autoprefixer = require('gulp-autoprefixer');
	var argv = require('yargs').argv;
	var gulpif = require('gulp-if');
	var cssmin = require('gulp-cssmin');
	var htmlmin = require('gulp-htmlmin');
	var livereload = require('gulp-livereload');

	var paths = {
			src: {
				html: './src/*.html',
				css: ['./src/css/vendors/*.css', './src/sass/**/*.scss'],
				fonts: './src/css/fonts/*',
				img: '.src/img/**/*.*',
				js: ['./src/js/vendors/*.js', './src/js/base.js']
			},
			build: {
				root: './_build',
				css: './_build/css',
				fonts: './_build/css/fonts',
				img: './_build/img',
				js: './_build/js'
			}
	}
	
	function cssTask() {
		gulp.src(paths.src.css)
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 10']
		}))
		.pipe(concat('base.min.css'))
		.pipe(gulpif((argv.prod), cssmin()))
		.pipe(gulp.dest(paths.build.css))
		.pipe(livereload());
	}

	function fontsTask() {
		gulp.src(paths.src.fonts)
			.pipe(gulp.dest(paths.build.fonts))
			.pipe(livereload());
	}

	function htmlTask() {
		gulp.src(paths.src.html)
			.pipe(gulpif((argv.prod), htmlmin({
				collapseWhitespace: true
			})))
			.pipe(gulp.dest(paths.build.root))
			.pipe(livereload());
	}

	function jsTask() {
		gulp.src(paths.src.js)
			.pipe(concat('base.min.js'))
			.pipe(gulp.dest(paths.build.js))
			.pipe(livereload());
	}

	function imgTask() {
		gulp.src(paths.src.img)
			.pipe(gulp.dest(paths.build.img))
			.pipe(livereload());
	}

	function defaultTask() {
		livereload({
			start: true
		});

		gulp.watch(paths.src.html, ['html']);
		gulp.watch(paths.src.css, ['css']);
		gulp.watch(paths.src.fonts, ['fonts']);
		gulp.watch(paths.src.img, ['img']);
		gulp.watch(paths.src.js, ['js']);
	}
	
	gulp.task('default', ['html', 'css', 'fonts', 'img', 'js'], defaultTask);
	gulp.task('html', htmlTask);
	gulp.task('css', cssTask);
	gulp.task('fonts', fontsTask);
	gulp.task('img', imgTask);
	gulp.task('js', jsTask);
}());