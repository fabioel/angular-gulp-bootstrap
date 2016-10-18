var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var iife = require('gulp-iife');
var templateCache = require('gulp-angular-templatecache');
var p = require('path');

var output = 'OUTPUT_NAME';

var paths = {
    javascripts: [
        './app/**/*.js',
        './dist/js/templates.js'
    ],
    styles: [
        './app/sass/app.scss'
    ],
    templates: [
        './app/templates/**/*.html'
    ]

};

gulp.task('default', ['scripts', 'styles']);

gulp.task('scripts', ['templates'], function() {
    return gulp.src(paths.javascripts)
        .pipe(iife())
        .pipe(concat(output))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
            module: 'OUTPUT_NAME',
            standalone: true
        }))
        //put all those to our javascript file
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./dist/js'))
})
