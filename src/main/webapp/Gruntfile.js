module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        properties: grunt.file.readJSON('grunt.properties.json'),

        /** Path locations to be used as templates */
        cssRoot: 'assets/css',
        cssSource: '<%= cssRoot %>/src',
        lessSource: '<%= cssRoot %>/less',
        cssVendor: '<%= cssRoot %>/vendor',
        cssDest: '<%= cssRoot %>/dest',
        jsRoot: 'assets/js',
        jsSource: '<%= jsRoot %>/src',
        jsVendor: '<%= jsRoot %>/vendor',
        jspSource: 'WEB-INF/view',
        tagSource: 'WEB-INF/tags',
        bowerRoot: 'bower_components',
        jsDest: '<%= jsRoot %>/dest',
        tomcatWeb: '<%= properties.deployDirectory %>',

        /** Compile LESS into css and place it into the css source directory */
        less: {
            dev: {
                options: {
                    sourceMap: true,
                },
                files: {
                    '<%= cssSource %>/main.css': ['<%= lessSource %>/main.less']
                }
            }
        },

        /** Minify all css into one file */
        cssmin: {
            options: {
                sourceMap: true
            },
            combine: {
                src: ['<%= cssSource %>/*.css', '<%= cssVendor %>/*.css'],
                dest: '<%= cssDest %>/app.min.css'
            }
        },

        /** Compress all js into dev and prod files */
        uglify: {
            vendor: {
                options: {
                    beautify: false,
                    mangle: false,
                    preserveComments: 'some',
                    sourceMap: true
                },
                files: {
                    '<%= jsDest %>/ess-vendor.min.js': [
                        // JQuery
                        '<%= bowerRoot %>/jquery/dist/jquery.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.core.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.widget.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.button.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.position.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.dialog.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.datepicker.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.menu.min.js',
                        '<%= bowerRoot %>/jquery-ui/ui/minified/jquery.ui.autocomplete.min.js',
                        // AngularJs
                        '<%= bowerRoot %>/angular/angular.min.js',
                        '<%= bowerRoot %>/angular-route/angular-route.min.js',
                        '<%= bowerRoot %>/angular-resource/angular-resource.min.js',
                        '<%= bowerRoot %>/angular-animate/angular-animate.min.js',
                        '<%= bowerRoot %>/angular-utils-pagination/dirPagination.js',
                        '<%= bowerRoot %>/angular-cookies/angular-cookies.min.js',
                        '<%= bowerRoot %>/angular-sanitize/angular-sanitize.min.js',

                        '<%= bowerRoot %>/odometer/odometer.min.js',
                        '<%= bowerRoot %>/moment/min/moment.min.js',
                        '<%= bowerRoot %>/floatThead/dist/jquery.floatThead.min.js',
                        '<%= bowerRoot %>/angular-float-thead/angular-floatThead.js',
                        '<%= bowerRoot %>/underscore/underscore-min.js',
                        '<%= bowerRoot %>/ui-autocomplete/autocomplete.js',
                        '<%= bowerRoot %>/nsPopover/src/nsPopover.js',
                        '<%= bowerRoot %>/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
                        ],
                    '<%= jsDest %>/ess-vendor-ie.min.js':
                        ['<%= bowerRoot %>/json2/json2.js']
                }
            },
            dev: {},
            prod: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: {
                        drop_console: true
                    },
                    preserveComments: 'some', /** Preserve licensing comments */
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %> */',
                    sourceMap: true
                },
                files: {
                    // main
                    '<%= jsDest %>/ess.min.js': [
                        '<%= jsSource %>/ess-app.js',
                        '<%= jsSource %>/ess-api.js',
                        // //<!-- Navigation -->
                        '<%= jsSource %>/nav/**/*.js',
                        // //<!-- Common Directives -->
                        '<%= jsSource %>/common/**/*.js',
                        // // <!-- Testing Code -->
                        '<%= jsSource %>/test/**/*.js'
                    ],
                    //help
                    '<%= jsDest %>/ess-help.min.js': ['<%= jsSource %>/help/help.js'],
                    //login
                    '<%= jsDest %>/ess-login.min.js': ['<%= jsSource %>/auth/login.js'],
                    //myinfo
                    '<%= jsDest %>/ess-myinfo.min.js': ['<%= jsSource %>/myinfo/**/*.js'],
                    //supply
                    '<%= jsDest %>/ess-supply.min.js': ['<%= jsSource %>/supply/**/*.js'],
                    //time
                    '<%= jsDest %>/ess-time.min.js': ['<%= jsSource %>/time/**/*.js'],
                    //travel
                    '<%= jsDest %>/ess-travel.min.js': ['<%= jsSource %>/travel/**/*.js']
                }
            }
        },

        /** Automatically run certain tasks based on file changes */
        watch: {
            less: {
                files: ['<%= lessSource %>/**.less', '<%= lessSource %>/common/**.less'],
                tasks: ['less', 'cssmin', 'copy:css', '<%= properties.lessBeep %>']
            },
            cssVendor: {
                files: ['<%= cssVendor %>/**/*.css'],
                tasks: ['cssmin', 'copy:css', '<%= properties.cssBeep %>']
            },
            jsVendor: {
                files: ['<%= bowerRoot %>/**.js'],
                tasks: ['uglify:vendor', 'copy:js', '<%= properties.jsVendorBeep %>']
            },
            jsSource: {
                files: ['<%= jsSource %>/**/*.js'],
                tasks: ['uglify:dev', 'uglify:prod', 'copy:js', '<%= properties.jsSourceBeep %>']
            },
            jsp: {
                files: ['<%= jspSource %>/**/*.jsp', '<%= tagSource %>/**/*.tag'],
                tasks: ['copy:jsp', '<%= properties.jspBeep %>']
            }
        },

        copy: {
            css: {
                files: [{
                    expand:true, cwd: '<%= cssDest %>/', src: ['**'], filter: 'isFile',
                    dest: '<%= tomcatWeb %>/assets/css/dest/'
                }]
            },
            js: {
                files: [{
                    expand:true, src: ['<%= jsSource %>/**', '<%= jsDest %>/**'], filter: 'isFile',
                    dest: '<%= tomcatWeb %>'}]
            },
            jsp : {
                files: [{
                    expand:true, src: ['<%= jspSource %>/**', '<%= tagSource %>/**'], filter: 'isFile',
                    dest: '<%= tomcatWeb %>'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-beep');

    grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'copy', 'beep:*-*---*-**-**-*-']);
};