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
    merge = require('merge-stream'),
    concat = require('gulp-concat'),
    del = require('del');

// Clean tasks
gulp.task('clean:html', function(){
    return del(['dist/**/*.html']);
});

gulp.task('clean:css', function(){
    return del(['dist/**/*.css', 'dist/**/*.css.map']);
});

gulp.task('clean:js', function(){
    return del(['dist/**/*.js', 'dist/**/*.js.map']);
});

gulp.task('clean:images', function(){
    return del(['dist/**/*.png', 'dist/**/*.jpg']);
});

// Lint and minify scripts
gulp.task('minifyJS', ['clean:js'], function(cb) {
    pump([
            gulp.src(['src/**/*.js']),
            sourcemaps.init(),
            jshint(),
            jshint.reporter('jshint-stylish'),
            uglify(),
            sourcemaps.write('.'),
            gulp.dest('dist')
        ],
        cb);
});

// Minify HTML, inline CSS and JS
gulp.task('minifyHTML', ['clean:html'], function() {
    return gulp.src(['src/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyCSS', ['clean:css'], function() {

// Style for index.html
    var print = gulp.src('src/css/print.css')
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
        .pipe(gulp.dest('dist/css/'));

// Style for other pages
    var app = gulp.src('src/css/*.css')
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
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/'));

// Pizza View CSS
    var styles = gulp.src(['src/views/css/*.css'])
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
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/views/css/'));

        return merge(print, app, styles);

});

// Move images to build folder
gulp.task('minifyImages', ['clean:images'], function() {
    return gulp.src(['src/**/*.jpg',
            'src/**/*.png'
        ])
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('src/**/*.js', ['minifyJS']);
    gulp.watch('src/**/*.css', ['minifyCSS']);
    gulp.watch('src/**/*.html', ['minifyHTML']);
})

gulp.task('build', ['minifyJS', 'minifyHTML', 'minifyCSS', 'minifyImages']);

gulp.task('default', ['watch']);
