const gulp = require('gulp');
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');

// Concatenate & Minify CSS
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
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('javascript', function () {
    return gulp.src([
        'js/jquery.js',
        'js/vegan-calculator.js',
        'js/modernizr.js',
        'js/foundation.js',
        'js/foundation.equalizer.js',
        'js/animal-slaughter.js',
        'js/autoscroll.js',
        'js/share.js'
    ], { allowEmpty: true })
        .pipe(concat('app.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

// Compile & Minify HTML
gulp.task('fileinclude', function () {
    return gulp.src(['src/**/*.html', '!src/partials/**'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// Build Task
gulp.task('build', gulp.series('css', 'javascript', 'fileinclude'));

// Watch Files & Serve
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch('js/**/*.js', gulp.series('javascript'));
    gulp.watch('src/**/*.html', gulp.series('fileinclude'));
});

// Default Task
gulp.task('default', gulp.series('build', 'watch'));