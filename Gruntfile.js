
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['lib/**/*.js', 'lib/**/*.js.map', 'lib/**/*.d.ts']
            }
        },
        ts: {
            build: {
                src: ['lib/**/*.ts', '!lib/**/*.d.ts'],
                tsconfig: true
            }
        },
        watch: {
            dev: {
                files: ['lib/**/*.ts', '!lib/**/*.d.ts'],
                tasks: ['ts:build'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('build', ['clean:build', 'ts:build']);
    grunt.registerTask('default', ['build', 'newer:watch:dev']);

};
