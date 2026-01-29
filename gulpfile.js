const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream()); // Inject CSS changes
});

// Compile HTML
// Compile HTML
gulp.task('fileinclude', function () {
    return gulp.src(['src/**/*.html', '!src/partials/**'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream()); // Reload on HTML change
});

// Build Task (no watch)
gulp.task('build', gulp.series('sass', 'fileinclude'));

// Watch Files & Serve
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('scss/*.scss', gulp.series('sass'));
    gulp.watch('src/**/*.html', gulp.series('fileinclude'));
});

// Default Task
gulp.task('default', gulp.series('build', 'watch'));