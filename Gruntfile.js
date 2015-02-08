'use strict';

module.exports = function (grunt) {

    var appConfig = {
        app: require('./package.json').name || 'app',
        dist: 'version'
    };

    grunt.initConfig({

        // Copy Tasks to copy all the files in src directory to dist directory =====
        copy: {
            main: {
                files: [
                    // includes files within app for server
                    {
                        src: ['app/*'],
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                    // includes files within view for server
                    {
                        expand: true,
                        src: ['app/views/*'],
                        dest: 'dist/',
                        filter: 'isFile'
                    },
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['app/public/images/*'],
                        dest: 'dist/'
                    },
                     // Workaround to create logs directory
                    {
                        expand: true,
                        src: ['logs/dummy.txt'],
                        dest: 'dist/app/'
                    }
                        ]
            }
        },

        // Clean Task for dist directory ===========================================

        clean: {
            build: {
                src: ['dist/']
            }
        },

        // JS TASKS ================================================================
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['app/**/*.js'],
            test: {
                options: {
                    jshintrc: 'tests/.jshintrc'
                },
                src: ['test/{,*/}*.js']
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/app/public/scripts/app.min.js': ['app/public/scripts/**/*.js']
                }
            }
        },

        //Run server side tests with mocha =========================================

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    run: true
                },
                src: ['test/*.js']
            }
        },

        // CSS TASKS ===============================================================
        cssmin: {
            build: {
                files: {
                    'dist/app/public/styles/style.min.css': 'app/public/styles/main.css'
                }
            }
        },

        // COOL TASKS ==============================================================
        watch: {
            css: {
                files: ['app/public/styles/**/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['app/*.js'],
                tasks: ['jshint', 'mochaTest', 'copy']
            }
        },
        nodemon: {
            dev: {
                script: 'dist/app/server.js'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test'); // For testing server side code
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // Run the default task for the grunt.
    grunt.registerTask('default', ['jshint', 'clean', 'copy', 'mochaTest', 'cssmin', 'uglify', 'concurrent']);

};
