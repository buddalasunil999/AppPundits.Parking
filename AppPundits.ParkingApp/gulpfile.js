/// <binding BeforeBuild='scripts' ProjectOpened='watch' />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = {
    //Include all js files but exclude any min.js files
    src: ['app/**/*.js', '!app/**/*.min.js'],
}

// Synchronously delete the output file(s)
gulp.task('clean', function () {
    del.sync(['app/all.min.js'])
});

// Combine and minify all files from the app folder
gulp.task('scripts', ['clean'], function () {

    return gulp.src(config.src)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('app/'));
});

gulp.task('watch', function () {
    return gulp.watch(config.src, ['scripts']);
});

gulp.task('browser', ['scripts'], function () {
    reload()
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', ['scripts'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(config.src, ['browser']);
});

//Set a default tasks
gulp.task('default', ['scripts'], function () { });