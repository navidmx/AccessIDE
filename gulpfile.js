/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { series, src, dest, watch } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const rimraf = require('gulp-rimraf');

function clean() {
    console.log('Clean all files in build folder');
    return src('server/dist/*', { read: false }).pipe(rimraf());
}

function typescript(cb) {
    console.log('Compiling typescript in /server/src/');
    return src('./server/src/**/*.ts')
        .pipe(tsProject())
        .pipe(dest('./server/dist'));
}

function serverFiles(cb) {
    console.log('copying files in /server/src/');
    return src(['./server/src/**/*', '!./server/src/**/*.ts']).pipe(dest('./server/dist'));
}

const build = series(clean, serverFiles, typescript);

exports.dev = function() {
    build();
    console.log('waiting for changes in /server/src/');
    watch(['./server/src/**/*.ts'], typescript);
};

exports.default = build;
