'use strict';

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

var SUPPORTED_BROWSERS = [
    "Android 2.3",
    "Android >= 4",
    "Chrome >= 20",
    "Firefox >= 24",
    "Explorer >= 8",
    "iOS >= 6",
    "Opera >= 12",
    "Safari >= 6"
];

var PATH = {
    src: {
        html: 'src/**/*.html',
        css: ['src/css/*.css',
            'src/css/**/*.css',
            'src/css/print.css',
            'src/views/css/*.css'
        ],
        js: 'src/**/*.js',
        assets: ['src/**/*.jpg',
            'src/**/*.png'
        ]
    },

    dist: {
        dist: 'dist',
        html: 'dist/**/*.html',
        css: ['dist/css/','dist/views/css/','dist/**/*.css', 'dist/**/*.css.map'],
        js: ['dist/**/*.js', 'dist/**/*.js.map'],
        assets: ['dist/**/*.png', 'dist/**/*.jpg']
    }
}

// Clean tasks
gulp.task('clean:html', function() {
    return del(PATH.dist.html);
});

gulp.task('clean:css', function() {
    return del([PATH.dist.css[2], PATH.dist.css[3]]);
});

gulp.task('clean:js', function() {
    return del([PATH.dist.js[0], PATH.dist.js[1]]);
});

gulp.task('clean:images', function() {
    return del([PATH.dist.assets[1], PATH.dist.assets[1]]);
});

// Lint and minify scripts
gulp.task('minifyJS', ['clean:js'], function(cb) {
    pump([
            gulp.src(PATH.src.js),
            sourcemaps.init(),
            jshint(),
            jshint.reporter('jshint-stylish'),
            uglify(),
            sourcemaps.write('.'),
            gulp.dest(PATH.dist.dist)
        ],
        cb);
});

// Minify HTML, inline CSS and JS
gulp.task('minifyHTML', ['clean:html'], function() {
    return gulp.src(PATH.src.html)
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(gulp.dest(PATH.dist.dist));
});

gulp.task('minifyCSS', ['clean:css'], function() {

    // Style for index.html
    var print = gulp.src(PATH.src.css[2])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: SUPPORTED_BROWSERS,
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.dist.css[0]));

    // Style for other pages
    var app = gulp.src(PATH.src.css[0])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: SUPPORTED_BROWSERS,
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.dist.css[0]));

    // Pizza View CSS
    var styles = gulp.src(PATH.src.css[3])
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: SUPPORTED_BROWSERS,
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.dist.css[1]));

    return merge(print, app, styles);

});

// Move images to build folder
gulp.task('minifyImages', ['clean:images'], function() {
    return gulp.src([PATH.src.assets[0],
            PATH.src.assets[1]
        ])
        .pipe(imagemin())
        .pipe(gulp.dest(PATH.dist.dist));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('src/**/*.js', ['minifyJS']);
    gulp.watch('src/**/*.css', ['minifyCSS']);
    gulp.watch('src/**/*.html', ['minifyHTML']);
})

gulp.task('build', ['minifyJS', 'minifyHTML', 'minifyCSS', 'minifyImages']);

gulp.task('default', ['watch']);
