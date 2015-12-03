
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            'default': {
                src: ['lib/**/*.js', 'lib/**/*.js.map', 'lib/**/*.d.ts']
            }
        },
        ts: {
            'default': {
                src: ['lib/**/*.ts', '!lib/**/*.d.ts'],
                tsconfig: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('build', ['ts:default']);
    grunt.registerTask('default', ['build']);

};
