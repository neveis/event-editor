var gulp = require('gulp');
var path = require('path');
var webpack = require('gulp-webpack');
var webpackDevConf = require('./build/webpack.dev.conf.js');

gulp.task('build', function() {
    gulp.src(['src/main.js'])
        .pipe(webpack(webpackDevConf))
        .pipe(gulp.dest('dist/'));
    gulp.src(['./renderer.js'])
        .pipe(gulp.dest('dist/'));
    gulp.src(['src/autosize.js'])
        .pipe(gulp.dest('dist/static/js'));
})