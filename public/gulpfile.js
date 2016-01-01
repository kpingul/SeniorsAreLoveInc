/* Gulp Plugins */

var gulp 		= require('gulp'),
	concat 		= require('gulp-concat'),
	rename 		= require('gulp-rename'),
	uglify 		= require('gulp-uglify'),
	templateCache = require('gulp-angular-templatecache'),
	minifyCss   = require('gulp-minify-css');

/* Resuable path configuration */

var paths = {

	bower: 'bower_components/',
	plugins: 'src/plugins/'

}

/* ***************** */

/* Define Gulp Tasks */

/* ***************** */






//Javascript scripts

gulp.task('CGDashBoardScripts', function(){

	return gulp.src([

				'src/js/app/CGDashBoard/app.js',
				'src/js/app/CGDashBoard/**/*.js'
			 ])
			.pipe(concat('CGDashBoardApp.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('build/js/CGDashBoard'));
});


//CSS sheets

gulp.task('styles', function(){

	return gulp.src('src/css/*.css')
			.pipe(rename({suffix: '.min'}))
			.pipe(minifyCss())
			.pipe(gulp.dest('build/css'));

});



/* ***************** */

/* Define Watch Tasks */

/* ***************** */

//Javascript files
gulp.task('watchScripts', function(){

	return gulp.watch('src/js/app/CGDashBoard/**/*.js', ['CGDashBoardScripts']);

})


//CSS files
gulp.task('watchStyles', function(){
	
	return gulp.watch('src/css/*.css', ['styles']);

});



gulp.task('cacheCGDashBoard', function () {
  return gulp.src('src/js/app/CGDashBoard/templates/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('src/js/app/CGDashBoard'));
});
gulp.task('cacheFamilyDashBoard', function () {
  return gulp.src('src/js/app/FamilyDashBoard/templates/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('public'));
});


//RUN IN SEQUENCE
gulp.task('default', ['watchScripts', 'watchStyles']);