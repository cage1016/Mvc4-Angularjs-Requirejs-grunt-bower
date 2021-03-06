﻿// Gruntfile
/*jslint devel: true, node: true, white:true */

module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var mvcConfig = {
        js: 'js',
        release: 'release',
        tmp:'tmp'
    };

    grunt.initConfig({
        mvc:mvcConfig,
        clean: {
            release: ['<%= mvc.release %>/'],
            tmp: ['<%= mvc.tmp %>/']
        },
        copy: {
            vendor: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular/',
                        src: 'angular.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-i18n/',
                        src: 'angular-locale_zh-tw.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-route/',
                        src: 'angular-route.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-resource/',
                        src: 'angular-resource.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-animate/',
                        src: 'angular-animate.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/angular-sanitize/',
                        src: 'angular-sanitize.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/jquery/',
                        src: 'jquery.min.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/momentjs',
                        src: 'moment.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/respond/src',
                        src: 'respond.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/requirejs-domready',
                        src: 'domReady.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    },
                    {                        
                        expand: true,
                        cwd: '<%= mvc.js %>/vendor/bootstrap/dist/js',
                        src: 'bootstrap.min.js',
                        dest: '<%= mvc.tmp %>/vendor'
                    }
                ]
            },
            module: {
                files: [{
                    expand: true,
                    cwd: '<%= mvc.js %>',
                    src: ['app.js', 'config.js','controllers/**', 'directives/**', 'filters/**', 'services/**','views/**', 'helpers/**'],
                    dest: "<%= mvc.tmp %>"
                }]
            },
            basic: {
                files: [{
                    expand: true,
                    cwd: '<%= mvc.tmp %>/vendor',
                    src: ['jquery.min.js', 'bootstrap.min.js'],
                    dest: '<%= mvc.release %>/vendor'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= mvc.js %>/css',
                    src: ['Site.css'],
                    dest: '<%= mvc.tmp %>/css'
                }, {
                    expand: true,
                    cwd: '<%= mvc.js %>/css/fonts',
                    src: ['*.*'],
                    dest: '<%= mvc.release %>/fonts'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    appDir: '<%= mvc.tmp %>',
                    baseUrl: './',
                    dir: '<%= mvc.release %>',                    
                    removeCombined: true,                    
                    paths: {
                        'jquery': '../<%= mvc.tmp %>/vendor/jquery.min',
                        'angular': '../<%= mvc.tmp %>/vendor/angular',
                        'angular.zh-tw': '../<%= mvc.tmp %>/vendor/angular-locale_zh-tw',
                        'angular.route': '../<%= mvc.tmp %>/vendor/angular-route',
                        'angular.resource': '../<%= mvc.tmp %>/vendor/angular-resource',
                        'angular.animate': '../<%= mvc.tmp %>/vendor/angular-animate',
                        'angular.sanitize': '../<%= mvc.tmp %>/vendor/angular-sanitize',
                        'moment': '../<%= mvc.tmp %>/vendor/moment',
                        'respond': '../<%= mvc.tmp %>/vendor/respond',
                        'domReady': '../<%= mvc.tmp %>/vendor/domReady',
                        'bootstrap': '../<%= mvc.tmp %>/vendor/bootstrap.min',
                    },
                    shim: {
                        'angular': {
                            deps: ['jquery', 'moment'],
                            exports: 'angular'
                        },
                        'angular.zh-tw': ['angular'],
                        'angular.route': ['angular'],
                        'angular.resource': ['angular'],
                        'angular.sanitize': ['angular'],
                        'angular.animate': ['angular']
                    },
                    modules: [
                        {
                            name: 'views/Home/index'
                        }
                    ],
                    onBuildRead: function (moduleName, path, contents) {
                        if (moduleName === 'config') {

                            var x = (function (contents) {
                                var regex = /'(vendor|libs)[^']*'/gm;
                                var matches = contents.match(regex);
                                for (var i = 0; i < matches.length; i++) {
                                    var match = matches[i];
                                    var m = matches[i].split('/');
                                    contents = contents.replace(match, '\'vendor/' + m[m.length - 1]);
                                }
                                return contents;
                            })(contents);

                            return x.replace(/\/public\/js/g, '/public/release');
                        }
                        return contents;
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= mvc.tmp %>/vendor/*.js'],
                dest: '<%= mvc.tmp %>/vendor/libs.js'
            }
        },
        uglify: {
            build: {
                src: ['<%= mvc.release %>/**/*.html'],
                dest: '<%= mvc.release %>/**/*.min.html'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= mvc.release %>/views',
                        src: ['**/*.html'],
                        dest: '<%= mvc.release %>/views'
                    }
                ]
            }
        },
        cssmin: {
            combine: {
                files: {
                    '<%= mvc.release %>/css/main.css': ['<%= mvc.tmp %>/css/*.css']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');    
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-piece-modulejs');

    // task
    grunt.registerTask('build', [
       'clean:release',
       'clean:tmp',
       'copy:vendor',
       'copy:module',
       'requirejs',
       'copy:basic',
       'copy:css',
       'cssmin',
       'clean:tmp',
       'htmlmin'
    ]);

    grunt.registerTask('default', [
        'build'
    ])
};
