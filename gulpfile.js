const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Compile HTML
gulp.task('fileinclude', function () {
    return gulp.src(['src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'));
});

// Watch Files
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', gulp.series('sass'));
    gulp.watch('src/**/*.html', gulp.series('fileinclude'));
});

// Default Task
gulp.task('default', gulp.series('sass', 'fileinclude', 'watch'));