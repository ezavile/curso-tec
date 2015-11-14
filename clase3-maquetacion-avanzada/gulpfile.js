var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

//levanta un servidor local
var webserver = require('gulp-webserver');
//actualizar el navegador automaticamente
var livereload = require('gulp-livereload');

///////// STYLUS ///////////////
//permite compilar stylus
var stylus = require('gulp-stylus');
//agrega prefijos a los attributos css
var nib = require('nib');
//minificaR los css
var minifyCSS = require('gulp-minify-css');


////////// JS /////////
//minificar JS
var uglify = require('gulp-uglify');

////////// JADE ////////////
var jade = require('gulp-jade');

///////// BORRAR LA CARPETA PUBLIC CADA VEZ QUE TRABAJE GULP ////
var clean = require('gulp-rimraf');

var config = {
	styles: {
		main: './src/styles/app.styl',
		output: './build/css'
	},
	htmls: {
		main: './src/index.jade',
		output: './build'
	},
	scripts:{
		main: './src/scripts/app.js',
		output: './build/js'
	}
}


gulp.task('build:html', function(){
	gulp
		.src(config.htmls.main)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(config.htmls.output));
});


gulp.task('build:css', function(){
	gulp
		.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css':true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output));
});


gulp.task('build:js', function(){
	gulp
		.src(config.scripts.main)
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output));
});