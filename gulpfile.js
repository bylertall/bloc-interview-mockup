var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inject = require('gulp-inject'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del');


/*Start browser sync*/
gulp.task('browser-sync', function() {

  browserSync.init({
    server: {baseDir: ['./app']}
  });

  gulp.watch('./app/**/*.scss', ['style']);
  gulp.watch('./app/index.html').on('change', reload);
});

/*Compile CSS*/
gulp.task('style', ['clean'], function() {
  return gulp.src('./app/style/scss/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({errLogToConsole: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/style'))
    .pipe(reload({stream:true}));
});

/*Clean up build folder*/
gulp.task('clean', function() {
  return del(['./app/**/*.css', '!./app/**/cssreset.css']);
});

/*Inject css links to html*/
gulp.task('inject', function() {
  var target = gulp.src('./app/index.html');

  return target.pipe(inject(gulp.src('./app/style/*.css', {read: false}), {relative: true}))
    .pipe(gulp.dest('./app'));
});

/*Default task*/
gulp.task('default', ['style', 'inject', 'browser-sync'], function() {
});

/*Build task only*/
gulp.task('build', ['style', 'inject'], function() {
});