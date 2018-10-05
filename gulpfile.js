let gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    usemin = require('gulp-usemin'),
    browserSync = require('browser-sync'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    csslint = require('gulp-csslint'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less');

gulp.task('default' , ['copy'], function () {
    gulp.start('build-img' , 'usemin');
});

gulp.task('copy' , ['clean'], function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean' , function () {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('build-img' , function () {

    gulp.src('dist/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('usemin' , function () {
   gulp.src('dist/**/*.html')
       .pipe(usemin({
         // 'js' : [uglify],
           'css' : [autoprefixer , cssmin]
       }))
       .pipe(gulp.dest('dist'));
});

gulp.task('server' , function () {
    browserSync.init({
        server: {
            baseDir : 'src'
        }
    });
    gulp.watch('src/assets/js/*.js').on('change' , function (event) {
           gulp.src(event.path)
               .pipe(jshint())
               .pipe(jshint.reporter(jshintStylish));
    });
    gulp.watch('src/assets/css/*.css').on('change' , function (event) {
           gulp.src(event.path)
               .pipe(csslint())
               .pipe(csslint.formatter());
    });
    gulp.watch('src/assets/less/*.less').on('change' , function (event) {
           gulp.src(event.path)
               .pipe(less().on('error' , function (error) {
                   console.log('Problema na compilação do Less' + error.message)
                 }))
               .pipe(gulp.dest('src/assets/css'))
    });
    gulp.watch('src/**/*').on('change' , browserSync.reload);
});