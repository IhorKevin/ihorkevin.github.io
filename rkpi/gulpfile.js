var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    axis = require('axis'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-rimraf');


gulp.task('html', function () {
    gulp.src('dev/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('build'));
});

gulp.task('stylus', function () {
    gulp.src('dev/styl/main.styl')
        .pipe(stylus({use: [nib(), axis()], compress: true}))
        .pipe(prefix('last 2 versions', 'ie 9'))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('fonts', function () {
    gulp.src('dev/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('js', function () {
    gulp.src('dev/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('img', function() {
    gulp.src('dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
    gulp.watch('dev/*.html', ['html']);
    gulp.watch('dev/styl/*.styl', ['stylus']);
    gulp.watch('dev/js/*.js', ['js']);
});

gulp.task('clean', function () {
    gulp.src('build')
        .pipe(clean());
});

gulp.task('default', ['html', 'stylus', 'js', 'img','fonts', 'watch']);
gulp.task('build', ['clean', 'html', 'stylus', 'js', 'img', 'fonts' ]);