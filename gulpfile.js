var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/style.css',
  ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html', 'src/css/style.css'],
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
  DEST_CSS: 'dist/css'
};

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('css', function(){
	gulp.src(path.CSS)
  	  .pipe(gulp.dest(path.DEST_CSS));
});

gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'copy', 'css']);
});

gulp.task('default', ['watch']);