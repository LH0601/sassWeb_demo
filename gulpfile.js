//获取对象，引入插件
var gulp = require("gulp"),
runSequence = require("run-sequence"),
browserSync = require('browser-sync').create(),
del = require('del'),
compass = require("gulp-compass"),
rename = require("gulp-rename"),
minifyCss = require("gulp-minify-css");

gulp.task('default',function(){
    return runSequence(['build'],['serve','watch'])
})

gulp.task("clean",function(callback){
    return del('./dist/',callback)
})
gulp.task('compass',function(){
    gulp.src('./src/*/*.scss')
    .pipe(compass({
        config_file:'./src/config.rb',
        css:'src/stylesheets',
        sass:'src/sass'
    }))
    .pipe(gulp.dest('./dist/css'))
    // .pipe(minifyCss())
    // .pipe(rename('main.min.css'))
    // .pipe(gulp.dest("./dist/css"))
})

gulp.task("copy-html",function(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest("./dist/"))
})

gulp.task("images",function(){
    return gulp.src("./src/img/**/*").pipe(gulp.dest("dist/images/"));
})


gulp.task('build',function(){
    return runSequence(['clean'],['compass'],['copy-html'],['scripts'],['images'])
})

const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');

gulp.task('scripts',function(){
    gulp.src("./src/js/index.js")
    // .pipe(concat("index.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))

})
gulp.task('reload',function(){
    return browserSync.reload();
});
gulp.task('watch',function(){
    return gulp.watch([
        './src/**/*.html',
        './src/img/**/*',
        './src/js/index.js',
        './src/**/*.scss'
    ],function(){
        return runSequence(['build'],['reload'])
    })
})

gulp.task('serve',function(){
    browserSync.init({
        server:'./dist',
        port:8888
    })
})
