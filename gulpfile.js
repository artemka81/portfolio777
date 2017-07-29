var gulp = require("gulp"); 
var runSequence = require('run-sequence');
var browserSync = require("browser-sync").create();
var rev = require('gulp-rev-append');
var sassGlob = require('gulp-sass-glob');

// Styles
var scss = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require('gulp-sourcemaps');

// Pug / Jade
var pug = require('gulp-pug');

// npm i gulp-less gulp-autoprefixer gulp-sourcemaps --save-dev
// npm i gulp-pug --save-dev



/* ------------------------------------
  SERVER
------------------------------------ */
gulp.task("server", function () {
	browserSync.init({
		// notify: false,
		// port: 1000,
		server: { baseDir: './app/' }
	});
});



/* ------------------------------------
  SCSS
------------------------------------ */
gulp.task('scss', function() {
    return gulp.src('./app/scss/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(scss())
      .pipe(autoprefixer({ browsers: ['last 4 versions'] }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./app/css/'))
      .pipe(browserSync.stream());
});


/* ------------------------------------
  PUG / JADE
------------------------------------ */
gulp.task('pug', function() {
    return gulp.src('./app/pug/*.pug')
      .pipe(pug({
    	// Your options in here. 
      }))
      .pipe(rev())
      .pipe(gulp.dest('./app/'))
      .pipe(browserSync.stream());
});



/* ------------------------------------
  WATCH
------------------------------------ */
gulp.task('watch', function() {
    gulp.watch('./app/scss/**/*.scss', ['scss']);
    gulp.watch('./app/pug/**/*.pug', ['pug']);
});	


/* ------------------------------------
  GULP - DEFAULT TASK 
------------------------------------ */
gulp.task('default', function() {
    runSequence(
    	['scss', 'pug'],
    	['server', 'watch']
    )
});



