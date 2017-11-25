import gulp from 'gulp';

gulp.task('copy', [
  'css',
  'html',
  'json',
  'resources',
]);

gulp.task('css', () => {
  gulp.src('src/**/*.css', { base: 'src/' })
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', () => {
  gulp.src('src/**/*.html', { base: 'src/' })
    .pipe(gulp.dest('./dist'));
});

gulp.task('json', () => {
  gulp.src('src/**/*.json', { base: 'src/' })
    .pipe(gulp.dest('./dist'));
});

gulp.task('resources', () => {
  gulp.src('src/**/*.svg', { base: 'src/' })
    .pipe(gulp.dest('./dist'));
  gulp.src('src/**/*.png', { base: 'src/' })
    .pipe(gulp.dest('./dist'));
});
