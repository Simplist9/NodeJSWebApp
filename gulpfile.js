let gulp = require('gulp')
let jshint = require('gulp-jshint')
let jscs = require('gulp-jscs')
let nodemon = require('gulp-nodemon')
let chalk = require('chalk')

let jsFiles = ['*.js', 'src/**/*.js']

gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose:true
        }))
        .pipe(jscs())
})

gulp.task('inject', function() {
    let wiredep = require('wiredep').stream
    let inject = require('gulp-inject')

    let injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false})

    let injectOptions = {
        ignorePath: '/public'
    }

    let options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    }

    return gulp.src('./src/views/*.jade')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'))
})

gulp.task('serve', ['style', 'inject'], function() {
    let options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    }

    return nodemon(options)
        .on('restart', (ev) => {
            console.log(chalk.blue('Restarting....'))
        })
})