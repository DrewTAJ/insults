// var gulp = require('gulp');
// var gutil = require('gulp-util');
// var bower = require('bower');
// var concat = require('gulp-concat');
// var sass = require('gulp-sass');
// var minifyCss = require('gulp-minify-css');
// var rename = require('gulp-rename');
// var sh = require('shelljs');
// var pump = require('pump');

var gulp = require("gulp");
var util = require("gulp-util");
var bower = require("bower");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglifyjs = require("uglify-js");
var minifier = require("gulp-minifier");
var pump = require("pump");
var sh = require("shelljs");
var replace = require("gulp-replace");

var paths = {
  scss: {
    directoryName: 'scss',
    source: ['./scss/**/*.scss']
  },
  css: {
    destination:'./www/css/'
  },
  js: {
    source: ['./source/**/*.js'],
    destination: './www/js/',
    configuration: {
      source: './source/factories/Configuration.js',
      destination: './source/factories'
    }
  }
};

gulp.task('default', ['scss','js']);

gulp.task('scss', function(done) {
  gulp.src(paths.scss.source)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css.destination))
    .pipe(cleanCSS({
      relativeTo: paths.scss.directoryName
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.css.destination))
    .on('end', done);
});

gulp.task('sass',['scss']);

gulp.task("js", function(done) {
	//var branch = sh.exec("git rev-parse --abbrev-ref HEAD", {silent: true}).output.replace(/\n/g, '');

	// console.log('>>> On:', branch);

	// if(branch === "production") {
	// 	console.log('>>> Setting to production environment...');
	// 	gulp.src([paths.js.configuration.source])
	// 		.pipe(replace('environment: "staging"', 'environment: "production"'))
	// 		.pipe(gulp.dest(paths.js.configuration.destination));
	// }

  console.log("in js");

	pump([
		gulp.src(paths.js.source)
			.pipe(concat("bundle.js").on("error", util.log))
			.pipe(gulp.dest(paths.js.destination))
			.pipe(rename({ extname: ".min.js" })),
			minifier({ mangle: false }, uglifyjs).on("error", util.log),
			gulp.dest(paths.js.destination)
	], done);
});

//gulp.task('js',['js']);

gulp.task("watch", function() {
	gulp.watch(paths.scss.source, ["scss"]);
	gulp.watch(paths.js.source, ["js"]);
});

// gulp.task('watch', ['scss'], function() {
//   gulp.watch(paths.sass, ['scss']);
// });

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
