var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    clean = require('gulp-rimraf');

gulp.task('stylus', function () {
    gulp.src('styl/main.styl')
        .pipe(stylus({use: [nib()], compress: true}))
        .pipe(prefix('last 2 versions', 'ie 9'))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('img', function() {
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
   gulp.watch('styl/*.styl', ['stylus']);
});

gulp.task('clean', function () {
    gulp.src('build')
        .pipe(clean());
});

gulp.task('default', ['stylus', 'img'], function() {
    console.log('gulp works!');
});