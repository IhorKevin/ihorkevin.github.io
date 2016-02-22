var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    stylus = require('gulp-stylus'),
    axis = require('axis'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    clean = require('del');


gulp.task('html', function () {
    gulp.src('dev/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeTagWhitespace: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('stylus', function () {
    gulp.src('dev/styl/main.styl')
        .pipe(stylus({use: [axis()], compress: true}))
        .pipe(prefix('last 2 versions', 'ie 9'))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('js', function () {
    gulp.src('dev/js/*.*')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('copy', function () {
    gulp.src('dev/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
    gulp.src('dev/vendor/**/*.*')
        .pipe(gulp.dest('build/vendor'));
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
    clean('build/*');
});

gulp.task('default', ['html', 'stylus', 'js', 'watch']);
gulp.task('build', ['clean', 'html', 'stylus','js', 'copy', 'img']);