import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import jsonMinify from 'gulp-json-minify';

gulp.task('minify', () => {
  gulp.src('src/**/*.css', { base: 'src/' })
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'));
  gulp.src('src/**/*.html', { base: 'src/' })
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));
  gulp.src('src/**/*.json', { base: 'src/' })
    .pipe(jsonMinify())
    .pipe(gulp.dest('./dist'));
  gulp.src('src/**/*.svg', { base: 'src/' })
    .pipe(gulp.dest('./dist'));
});
