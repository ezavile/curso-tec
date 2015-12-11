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

///////// BORRAR LA CARPETA BUILD CADA VEZ QUE TRABAJE GULP ////
var clean = require('gulp-rimraf');

var config = {
	styles: {
		main: './src/styles/app.styl',
		output: './build/css',
		watch: './src/styles/*.styl',
		fonts:{
			main: './src/styles/fonts/*',
			output: './build/css/fonts/'
		}
	},
	htmls: {
		main: './src/index.jade',
		output: './build',
		watch: './src/*.jade'
	},
	scripts:{
		main: './src/scripts/*.js',
		output: './build/js',
		watch: './src/scripts/*.js'
	},
	api:{
		main: './api/*',
		output: './build/api'
	}
}

gulp.task('server', function(){
	gulp
		.src('./build')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 8080
		}));
})

/*
gulp.task('api', function(){
	gulp
		.src('./api')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 3000
		}));
})*/

gulp.task('clean', function(){
	return gulp
				.src('./build', {read: false})
				.pipe(clean(-{force: true}));
})

gulp.task('build:html', function(){
	gulp
		.src(config.htmls.main)
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(config.htmls.output))
		.pipe(livereload());
});


gulp.task('build:css', function(){
	gulp
		.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css':true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output))
		.pipe(livereload());
});


gulp.task('build:js', function(){
	gulp
		.src(config.scripts.main)
		//.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output))
		.pipe(livereload());
});

// Observa los cambios tanto en HTML, CSS y JS
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.scripts.watch, ['build:js']);
	gulp.watch(config.htmls.watch, ['build:html']);
})


//Copiar carpeta FONTS
gulp.task('build:fonts', function(){
	gulp
		.src(config.styles.fonts.main)
		.pipe(gulp.dest(config.styles.fonts.output));
});

//Copiar carpeta API
gulp.task('api', function(){
	gulp
		.src(config.api.main)
		.pipe(gulp.dest(config.api.output));
});


//Tarea por default
gulp.task('default',['clean','server','watch'], function(){
	gulp
		.start('build:fonts','build:css','build:js','build:html','api');
})