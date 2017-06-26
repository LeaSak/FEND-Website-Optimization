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
    del = require('del'),
    size = require('gulp-size');


// var errorCB = function(error){
//     if(error){
//         console.log('Error: ', error.toString());
//     }
// };

// gulp.task('clean', function(){
//     return del(['dist/']);
// });


// Clean tasks
gulp.task('clean:html', function(){
    return del(['dist/**/*.html']);
});

gulp.task('clean:css', function(){
    return del(['dist/**/*.css']);
});

gulp.task('clean:js', function(){
    return del(['dist/**/*.js']);
});

gulp.task('clean:images', function(){
    return del(['dist/**/*.png', 'dist/**/*.jpg']);
});

// Lint and minify scripts
gulp.task('minifyJS', ['clean:js'], function(cb) {
    pump([
            gulp.src(['src/**/*.js']),
            jshint(),
            jshint.reporter('jshint-stylish'),
            sourcemaps.init(),
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

// Minify CSS
gulp.task('minifyCSS', ['clean:css'], function() {
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
