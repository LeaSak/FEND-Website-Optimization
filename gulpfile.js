var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    pump = require('pump'),
    clean = require('gulp-clean')
    size = require('gulp-size');


// Task to clean dist directory
gulp.task('clean', function(){
    return gulp.src('dist', {read: false})
    .pipe(clean())
});

// Task to run JS hint
gulp.task('jshint', ['clean'], function() {
    return gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Minify scripts
gulp.task('minifyJS', ['jshint', 'clean'], function(cb) {
    pump([
            gulp.src(['src/**/*.js']),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('.'),
            gulp.dest('dist')
        ],
        cb);
});

// Minify HTML, inline CSS and JS
gulp.task('minifyHTML', ['clean'], function() {
    return gulp.src(['src/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('dist'));
});

// Minify CSS
gulp.task('minifyCSS', ['clean'], function() {
    return gulp.src('src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// Move images to build folder
gulp.task('minifyImages', ['clean'], function() {
    gulp.src(['src/**/*.jpg',
            'src/**/*.png'
        ])
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['jshint', 'minifyJS']);
    gulp.watch('src/**/*.css', ['minifyCSS']);
    gulp.watch('src/**/*.html', ['minifyHTML']);
})

gulp.task('build', ['clean','jshint', 'minifyJS', 'minifyHTML', 'minifyCSS', 'minifyImages']);

gulp.task('default', ['build', 'watch']);
