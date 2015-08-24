/// <binding />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = {
    //Include all js files but exclude any min.js files
    scripts: ['scripts/**/*.js'],
    jssrc: ['app/**/*.js', '!app/**/*.min.js'],
    index: ['index.html'],
    htmlsrc: ['app/**/*.html'],
    csssrc: ['Content/*.css'],
    imgsrc: ['Content/images/**/*.*'],
    fontssrc: ['fonts/**/*.*'],
    dist: ['build/'],
}

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(config.dist)
    .pipe(clean());
});

gulp.task('scripts-clean', function () {

    return gulp.src('build/scripts/**/*.js')
   .pipe(clean());
});

gulp.task('jssrc-clean', function () {
    
    return gulp.src('build/app/**/*.js')
   .pipe(clean());
});

gulp.task('html-clean', function () {
    
    return gulp.src('build/index.html')
   .pipe(clean());
});

gulp.task('htmlsrc-clean', function () {
    
    return gulp.src('build/app/**/*.html')
   .pipe(clean());
});

gulp.task('csssrc-clean', function () {
    
    return gulp.src('build/Content/**/*.css')
   .pipe(clean());
});

gulp.task('imgsrc-clean', function () {
    
    return gulp.src('build/Content/images/')
   .pipe(clean());
});

gulp.task('fonts-clean', function () {
    
    return gulp.src('build/fonts/')
   .pipe(clean());
});

// Combine and minify all files from the app folder
gulp.task('scripts', ['scripts-clean'], function () {

    return gulp.src('scripts/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('build/scripts/'));
});

gulp.task('jssrc', ['jssrc-clean'], function () {

    return gulp.src(config.jssrc)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('build/app/'));
});

gulp.task('html', ['html-clean'], function () {

    return gulp.src('index.html')
     .pipe(gulp.dest('build/'));
});

gulp.task('htmlsrc', ['htmlsrc-clean'], function () {

    return gulp.src(config.htmlsrc)
     .pipe(gulp.dest('build/app/'));
});

gulp.task('csssrc', ['csssrc-clean'], function () {

    return gulp.src(config.csssrc)
     .pipe(gulp.dest('build/Content/'));
});

gulp.task('imgsrc', ['imgsrc-clean'], function () {

    return gulp.src(config.imgsrc)
     .pipe(gulp.dest('build/Content/images/'));
});

gulp.task('fonts', ['fonts-clean'], function () {

    return gulp.src('fonts/**/*.*')
     .pipe(gulp.dest('build/fonts/'));
});

gulp.task('scripts-watch', ['scripts'], function () { reload(); });
gulp.task('jssrc-watch', ['jssrc'], function () { reload(); });
gulp.task('html-watch', ['html'], function () { reload(); });
gulp.task('htmlsrc-watch', ['htmlsrc'], function () { reload(); });
gulp.task('csssrc-watch', ['csssrc'], function () { reload(); });
gulp.task('imgsrc-watch', ['imgsrc'], function () { reload(); });
gulp.task('fonts-watch', ['fonts'], function () { reload(); });

gulp.task('watch', function () {
    gulp.watch([config.scripts], ['scripts-watch']);
    gulp.watch([config.index], ['html-watch']);
    gulp.watch([config.jssrc], ['jssrc-watch']);
    gulp.watch([config.csssrc], ['csssrc-watch']);
    gulp.watch([config.imgsrc], ['imgsrc-watch']);
    gulp.watch([config.fontssrc], ['fonts-watch']);
    gulp.watch([config.htmlsrc], ['htmlsrc-watch']);
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', ['scripts', 'jssrc', 'html', 'htmlsrc', 'csssrc', 'imgsrc', 'fonts', 'watch'], function () {

    // Serve files from the root of this project
    browserSync.init(['./build/css/**.*', './build/js/**.*'], {
        server: {
            baseDir: "./build"
        }
    });
});

//Set a default tasks
gulp.task('default', ['serve'], function () { });