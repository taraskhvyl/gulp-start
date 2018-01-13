var gulp     = require('gulp');
var svgmin   = require('gulp-svgmin');
var iconfont = require('gulp-iconfont');
var iconfontCss     = require('gulp-iconfont-css');
var changed  = require('gulp-changed');
var plumber  = require('gulp-plumber');
var config   = require('../config');

gulp.task('svgo', function() {
    return gulp
        .src(config.src.icons + '/**/*.svg')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(changed(config.dest.img))
        .pipe(svgmin({
            plugins: [{
                removeDoctype: true
            }, {
                removeComments: true
            }, {
                convertColors: {
                    names2hex: false,
                    rgb2hex: false
                }
            }, {
                removeXMLNS: true
            }, {
                cleanupIDs: true
            }, {
                removeTitle: true
            }]
        }))
        .pipe(iconfontCss({
            path: config.src.sass + '/helpers/icon-fonts.scss',
            fontName: 'svg-icons',
            targetPath: '../scss/generated/_icons.scss',
            fontPath: config.src.fonts
        }))
        .pipe(iconfont({
            fontName: 'svg-icons',
            prependUnicode: true,
            formats: ['ttf', 'woff'], // default, 'woff2' and 'svg' are available
            fontHeight: 1001,
            normalize:true

        }))
        .pipe(gulp.dest(config.src.fonts));
});

gulp.task('svgo:watch', function() {
    gulp.watch(config.src.icons + '/**/*.svg', ['svgo']);
});
