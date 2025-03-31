// Импорт пакетов
'use strict';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import pkg from 'gulp';
const { src, dest } = pkg;

import gulp from 'gulp'
const sass = require('gulp-sass')(require('sass'))
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import imagemin from 'gulp-imagemin'
import htmlmin from 'gulp-htmlmin'
import size from 'gulp-size'
import newer from 'gulp-newer'
import browsersync from 'browser-sync';
import del from 'del'
import webp from 'gulp-webp';
import include from 'gulp-include';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';


import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const webpackConfig = require('./webpack.config.cjs')

const server = browsersync.create();
// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
  html: {
    src: ['src/*.html', 'src/*.pug'],
    dest: 'dist/'
  },
  styles: {
    src: ['src/scss/**/*.sass', 'src/scss/**/*.scss', 'src/scss/**/*.css', 'src/scss/*.scss', 'src/scss/**.scss'],
    dest: 'dist/css/'
  },
  scripts: {
    src: ['src/js/**/*.coffee', 'src/js/**/*.ts', 'src/js/**/*.js', 'src/js/**', 'src/js/components/**'],
    dest: 'dist/js/'
  },
  components: {
    src: 'src/components/**',
    dest: 'dist/components/'
  },
  pages: {
    src: 'src/pages/**',
    dest: 'dist/pages/'
  },
  images: {
    src: 'src/img/**/*.{png,jpg,svg,jpeg,avif,webp}',
    dest: 'dist/img/'
  },

  fonts: {
    src: 'src/fonts/**',
    dest: 'dist/fonts/'
  }
}

// Преобразование из других форматов шрифтов в woof2, ttf2 
export function fonts() {
  return src(paths.fonts.src)
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('src/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest(paths.fonts.dest))
}


// Разделение html-файлов на компоненты
export function components() {
  return src(paths.pages.src)
    .pipe(include({
      includePaths: paths.components.src
    }))
    .pipe(dest(paths.html.dest))
    .pipe(server.stream())

}

// Очистить каталог dist, удалить все кроме изображений
export function clean() {
  return del(['dist/*'])
}

// Обработка html
export function html() {
  return gulp.src(paths.html.src)
    //.pipe(gulppug())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(server.stream())
}

// Обработка препроцессоров стилей
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream())
}

// Обработка Java Script
export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig), webpack)
    // .pipe(sourcemaps.init())
    // .pipe(
    //   babel({
    //   presets: ['@babel/env'],
    // }))
    // .pipe(uglify())
    // .pipe(concat('main.min.js'))
    // .pipe(sourcemaps.write('.'))
    // .pipe(size({
    //   showFiles:true
    // }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(server.stream())
}

// Сжатие изображений
export function img() {
  return src(paths.images.src)
    //   .pipe(avif())
    // .pipe(newer(paths.images.dest))

    // .pipe(src(paths.images.src))
    // .pipe(newer(paths.images.dest))
    // .pipe(webp())

    .pipe(src(paths.images.src))
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(dest(paths.images.dest))
}

// Отслеживание изменений в файлах и запуск лайв сервера
export function watch() {
  server.init({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch(paths.components.src, components)
  gulp.watch(paths.html.dest).on('change', server.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, img)
  gulp.watch(paths.fonts.src, fonts)
}

// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.

// Таск, который выполняется по команде gulp
export default gulp.series(clean, html, gulp.parallel(scripts, components, fonts, styles, img), watch)