var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');



// gulp.task('default', function() {
//   console.log("gulp is setup");
// });

gulp.task('minifyJS', function(){
    return gulp.src('src/js/perfmatters.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('minifyHTML', function() {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true}))
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
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// Copy and move images to build folder
gulp.task('copyImages', function() {
    gulp.src(['src/**/*.jpg',
        'src/**/*.png'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['minifyJS', 'minifyHTML', 'minifyCSS', 'copyImages']);


