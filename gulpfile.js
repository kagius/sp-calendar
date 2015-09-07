'use strict';

var properties = {
	"output": {
		"css": "./dist/styles",
		"js": "./dist/scripts",
		"html": "./dist"
	},
	"sources": {
		"sass": "./src/sass",
		"jade": "./src/jade",
		"typescript": "./src/ts"
	}
};

var gulp = require('gulp');

/* CSS generation */
var sass = require('gulp-sass');
var sassSourcePattern = properties.sources.sass + '/**/*.scss';

gulp.task('sass', function () {
	gulp.src(sassSourcePattern)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest(properties.output.css));
});

gulp.task('sass:watch', function () {
	gulp.watch(sassSourcePattern, ['sass']);
});

/* HTML generation */
var jade = require('gulp-jade');
var jadeSourcePattern = properties.sources.jade + '/**/*.jade';

gulp.task('jade', function() {
	gulp.src(jadeSourcePattern)
		.pipe(jade({
			locals: {
				"stylesheet": "styles/style.css"
			}
		}))
		.pipe(gulp.dest(properties.output.html));
});

gulp.task('jade:watch', function () {
	gulp.watch(jadeSourcePattern, ['jade']);
});

/* Typescript compiler */
var ts = require("gulp-typescript");
var typeScriptSourcePattern = properties.sources.typescript + '/**/*.ts';

gulp.task("typescript", function () {
  var tsResult = gulp.src(typeScriptSourcePattern)
    .pipe(ts({
        noImplicitAny: true,
        target:"es5",
        module: "commonjs",
        experimentalDecorators: true
      }));
  return tsResult.js.pipe(gulp.dest(properties.output.js));
});

gulp.task("typescript:watch", function () {
	gulp.watch(typeScriptSourcePattern, ["typescript"]);
});

/* Http server */
var gls = require('gulp-live-server');

gulp.task('serve', function() {
  var server = gls.static('dist', 8080);
  server.start();

	gulp.watch(["dist/**/*.*"], function (file) {
      server.notify.apply(server, [file]);
    });;
});

/* All */
gulp.task("default", ["jade", "sass", "typescript", "serve"]);
gulp.task("watch", ["jade:watch", "sass:watch", "typescript:watch", "serve"]);