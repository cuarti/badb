
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
            dev: {
                src: ['lib/**/*.ts', '!lib/**/*.d.ts'],
                tsconfig: true,
                options: {
                    declaration: false,
                    sourceMap: false
                }
            },
            build: {
                src: ['lib/**/*.ts', '!lib/**/*.d.ts'],
                tsconfig: true
            }
        },
        watch: {
            dev: {
                files: ['lib/**/*.ts', '!lib/**/*.d.ts'],
                tasks: ['ts:dev'],
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
    grunt.registerTask('dev', ['clean:build', 'ts:dev']);
    grunt.registerTask('default', ['dev', 'newer:watch:dev']);

};
