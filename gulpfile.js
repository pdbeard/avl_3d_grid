var gulp = require('gulp');

var build = require('gulp-build');

gulp.task('build', function() {
  gulp.src('*.html')
	  .pipe(build({ GA_ID: '123456' }))
	  .pipe(gulp.dest('dist'))
});
