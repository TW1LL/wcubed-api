var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint');

var tsProject = ts.createProject('tsconfig.json', {out: 'app.js'});

gulp.task('compile', ['tslint'], function() {
    var tsResult = gulp.src('./src')
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./build'));
});
gulp.task('tslint', function() {
    return gulp.src('./src/**/*.ts')
        .pipe(tslint({
            formatter: "stylish"
        }))
        .pipe(tslint.report({allowWarnings: true, emitError: false}));
})

gulp.task('default', ['compile'], function () {
    return nodemon({
        script: './build/framework/app.js',
        watch: './src',
        tasks: ['compile'],
        ext: 'ts html',
    });
});