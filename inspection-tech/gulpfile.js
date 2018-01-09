'use strict';

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var paths = {
    scripts: ['./public/scripts/*.js', '!./public/scripts/*.min.js'],
    styles: ['./public/styles/**/*.scss']
};

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        // error handling
        .on('error', function(error) {
            console.error(error);
            this.emit('end');
        })
        // load existing sourcemap (if any)
        .pipe(sourcemaps.init({
            loadmaps: true
        }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        // create sourcemap (relative to gulp.src)
        .pipe(sourcemaps.write('./'))
        // set the destination
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        // error handling
        .on('error', function(error) {
            console.error(error);
            this.emit('end');
        })
        // scss to css
        .pipe(sass({
            outputStyle: 'compressed',
            sourcemap: true
        }))
        // load existing sourcemap (if any)
        .pipe(sourcemaps.init({
            loadmaps: true
        }))
        // autoprefix
        .pipe(autoprefixer({
            browsers: '> 1%',
            cascade: false
        }))
        // create sourcemap
        .pipe(sourcemaps.write('./'))
        // set the destination
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);
