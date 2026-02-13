const gulp = require('gulp');
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// Concatenate CSS
gulp.task('css', function () {
    return gulp.src([
        'src/css/normalize.css',
        'src/css/foundation.css',
        'src/css/variables.css',
        'src/css/style.css',
        'src/css/vegan-calculator.css',
        'src/css/animals.css'
    ])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Compile HTML
gulp.task('fileinclude', function () {
    return gulp.src(['src/**/*.html', '!src/partials/**'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// Build Task
gulp.task('build', gulp.series('css', 'fileinclude'));

// Watch Files & Serve
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch('src/**/*.html', gulp.series('fileinclude'));
});

// Default Task
gulp.task('default', gulp.series('build', 'watch'));