var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',
    
    'jade:watch',
    'svgo:watch',
    'list-pages:watch',
    'js:watch',
    'sass:watch'
]);
