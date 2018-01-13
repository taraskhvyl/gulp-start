var gulp        = require('gulp');
var jade        = require('gulp-jade');
var plumber     = require('gulp-plumber');
var changed     = require('gulp-changed');
var gulpif      = require('gulp-if');
var frontMatter = require('gulp-front-matter');
var prettify    = require('gulp-prettify');
var header      = require('gulp-header');
var config      = require('../config');

var banner= {
    full :
    '<!--!\n' +
    ' *' + config.info.name + ' : ' + config.info.description + '\n' +
    ' * (c) ' + new Date().getFullYear() + '\n' +
    ' * Developer: ' + config.info.author.name + '\n' +
    ' * Dev. website : ' + config.info.author.url + '\n' +
    ' * MIT License\n' +
    ' -->\n\n'
};


function renderHtml(onlyChanged) {
    return gulp
        .src([config.src.templates + '/[^_]*.jade'])
        .pipe(plumber({ errorHandler: config.errorHandler }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(jade())
        .pipe(header(banner.full))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: true,
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.html));
}

function renderAllHtml(onlyChanged) {
    return gulp
        .src([config.src.templates + '/**/[^_]*.jade'])
        .pipe(plumber({ errorHandler: config.errorHandler }))
        .pipe(gulpif(onlyChanged, changed(config.dest.jadeblocks, { extension: '.html' })))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(jade())
        .pipe(header(banner.full))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: true,
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.jadeblocks));
}

gulp.task('jade-all', function() {
    return renderAllHtml();
});

gulp.task('jade', function() {
    return renderHtml();
});

gulp.task('jade:changed', function() {
    return renderHtml(true);
});

gulp.task('jade:watch', function() {
    gulp.watch([config.src.templates + '/**/_*.jade'], ['jade']);
    gulp.watch([config.src.templates + '/**/[^_]*.jade'], ['jade']);
});
