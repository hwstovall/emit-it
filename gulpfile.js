var gulp = require('gulp');

var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('build-js', function () {
    return gulp.src('./src/EmitIt.js')
        .pipe(babel())
        .pipe(gulp.dest('./lib'))
        .pipe(uglify())
        .pipe(rename('emit-it.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('build-example', function(){
    return gulp.src('./example/src/example.js')
        .pipe(browserify())
        .pipe(gulp.dest('./example/build'))
});

gulp.task('default', ['build-js', 'build-example']);