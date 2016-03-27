var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    axis = require('axis'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    webpack = require('webpack'),
    gulpWebpack = require('gulp-webpack');


gulp.task('stylus', function () {
    gulp.src('styl/main.styl')
        .pipe(stylus({use: [axis()], compress: true}))
        .pipe(prefix('last 2 versions', 'ie 9'))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'));
});

//gulp.task('js', function () {
//    gulp.src('dev/js/*.*')
//        .pipe(concat('main.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('build/js'));
//});

gulp.task('img', function() {
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'));
});

gulp.task('watch', function() {
    gulp.watch('styl/*.styl', ['stylus']);
    gulp.watch('source/*.js', ['webpack']);
    //gulp.watch('dev/js/*.js', ['js']);
});

gulp.task('webpack', function () {
    return gulp.src('./source/App.js')
        .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['stylus', 'webpack', 'watch']);
//gulp.task('build', ['clean', 'html', 'stylus','js', 'copy', 'img']);
