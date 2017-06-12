var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size');



// gulp.task('default', function() {
//   console.log("gulp is setup");
// });

gulp.task('minifyJS', function(){
    return gulp.src(['src/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyHTML', function() {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true}))
    .pipe(size())
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyCSS', function(){
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
    .pipe(size())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// Move images to build folder
// compressed using imageMagick cli
gulp.task('minifyImages', function() {
    gulp.src(['src/**/*.jpg',
        'src/**/*.png'
        ])
        .pipe(imagemin())
        .pipe(size())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['minifyJS']);
    gulp.watch('src/**/*.css', ['minifyCSS']);
    gulp.watch('src/**/*.html', ['minifyHTML']);
})

gulp.task('build', ['minifyJS', 'minifyHTML', 'minifyCSS', 'minifyImages']);

gulp.task('default', ['watch', 'build']);


