var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/style.css',
  HTMLCSS: ['src/index.html', 'src/css/style.css'],
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_CSS: 'dist/css',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/js',
  ENTRY_POINT: './src/js/main.js',
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DEST_CSS));
});

/*gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      js: 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});*/

/*gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(/*path.MINIFIED_OUT*//*)))
    .pipe(gulp.dest(path.DEST_BUILD));
});*/

gulp.task('watch', function() {
  gulp.watch(path.HTMLCSS, ['copy']);
  //gulp.watch(path.HTML, ['replaceHTML']);
  //appends everything after script tag as well as changes src, revise later

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    var updateStart = Date.now();
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated.', (Date.now() - updateStart) + ' ms');  })
    /*.bundle().on('error', function(err) {
      console.log(err.message)
      this.end();
    })*/
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

//gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['watch']);






