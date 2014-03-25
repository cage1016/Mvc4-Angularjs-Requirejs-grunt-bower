// Gruntfile
/*jslint devel: true, node: true, white:true */

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var mvcConfig = {
        js: 'js',
        release: 'release'
    };

    grunt.initConfig({
        mvc:mvcConfig,
        clean: {
            release: ['<%= mvc.release %>/']
        },
        copy: {
            vendor: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular/',
                        src: 'angular.js',
                        dest: '<%= mvc.release %>/vendor/angular'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-route/',
                        src: 'angular-route.js',
                        dest: '<%= mvc.release %>/vendor/angular'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-resource/',
                        src: 'angular-resource.js',
                        dest: '<%= mvc.release %>/vendor/angular'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-animate/',
                        src: 'angular-animate.js',
                        dest: '<%= mvc.release %>/vendor/angular'
                    }
                ]
            },
            module: {
                files: [{
                    expand: true,
                    cwd: '<%= mvc.js %>',
                    src: ['app.js', 'config.js','controllers/**', 'directives/**', 'filters/**', 'services/**','views/**'],
                    dest: "<%= mvc.release %>"
                }]
            }
        }
    });

    // task
    grunt.registerTask('build', [
       'clean:release',
       'copy:vendor',
       'copy:module'
    ]);

    grunt.registerTask('default', [
        'build'
    ])
};
