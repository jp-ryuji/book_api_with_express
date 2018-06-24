const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const chalk = require('chalk');
const gulpMocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');

gulp.task('default', () => {
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: ['./node_modules/**']
  }).on('restart', () => {
    console.log(chalk.green('Restarting...'));
  });
});

gulp.task('test', () => {
  env({ vars: { ENV: 'Test' } });
  gulp.src('tests/*.js', { read: false }).pipe(gulpMocha({ reporter: 'nyan' }));
});
