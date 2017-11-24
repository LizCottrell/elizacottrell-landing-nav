var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var replace = require('gulp-replace');
var reload = browserSync.reload;

gulp.task('sass', function(){
	gulp.src('sass/main.scss')
		.pipe(sass({
			includePaths: ['sass'],
			outputStyle: 'expanded'
		}))
		.pipe(gulp.dest('css/.'));
});

gulp.task('serve', function(){
	browserSync.init(['css/main.css', '*.html', 'js/*.js'], {
		server: {
			baseDir: './'
		}
	});
});

// Combine multiple tasks into one
gulp.task('watch', ['sass', 'serve'], function(){
	gulp.watch(['sass/*.scss'], ['sass']);
});


/* PRODUCTION TASKS
	- Compile SASS, compressed (single line)
	- Replace image paths with production ready versions
*/
gulp.task('buildcss', function(){
	gulp.src('sass/main.scss')
		.pipe(sass({
			includePaths: ['sass'],
			outputStyle: 'compressed'
		}))
		.pipe(replace('../img/', '/path/on/server/img/'))
		.pipe(gulp.dest('build/.'));
});



// The pipe() function reads data from a readable stream as it becomes available and writes it to a destination writable stream.

