module.exports = function(grunt) {
    var srcPath         = ["js/**/*.js"];
    var libs            = [ 
        "bower_components/jspdf/dist/jspdf.min.js", 
        "bower_components/jspdf-autotable/dist/jspdf.plugin.autotable.js", 
        "bower_components/moment/min/moment-with-locales.min.js", 
        //"bower_components/jquery/dist/jquery.js", 
    ];    
    var specsPath       = 'specs/**/*spec*.js';
    var helperPath      = 'specs/helpers/*.js';

    grunt.initConfig({
        concat: {
            none : {},
            js : {
                options: {
                    process: function(src, filepath) {
                        return '\n' + '// FILE: ' + filepath + '\n' + src;
                    }
                },
                src:libs.concat(srcPath),
                dest: 'dist/js/printjs.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', specsPath].concat(srcPath)
        },    
        jasmine : {
            pivotal:{
                // Your project's source files
                src : [srcPath],
                // Your Jasmine spec files
                options: {
                    vendor : ["specs/libs/*.js"].concat(libs),
                    specs : specsPath,
                    // Your spec helper files
                    helpers : helperPath,
                    coverage : {
                        output : 'coverage/',
                        reportType : 'cobertura',
                        excludes : ['lib/**/*.js', 'bower_components/**/*.js']    
                      },
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                report : 'min',
                // the banner is inserted at the top of the output
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: { 
                'dist/js/printjs.min.js': libs.concat(srcPath)
                }
            }
        },
        watch: {
            pivotal : {
                files: [specsPath].concat(srcPath), 
                tasks: ['jshint', 'uglify', 'concat']
            },
            test : {
                files: [specsPath].concat(srcPath), 
                tasks: ['jasmine']
            }
        },
         complexity: {
            generic: {
                src: srcPath,
                exclude: ['doNotTest.js'],
                options: {
                    breakOnErrors: true,
                    jsLintXML: 'report.xml',         // create XML JSLint-like report
                    checkstyleXML: 'checkstyle.xml', // create checkstyle report
                    errorsOnly: false,               // show only maintainability errors
                    cyclomatic: [],          // or optionally a single value, like 3
                    halstead: [8, 13, 20],           // or optionally a single value, like 8
                    maintainability: 100,
                    hideComplexFunctions: false,     // only display maintainability
                    broadcast: false                 // broadcast data over event-bus
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-complexity');

    // Default task.
    //grunt.registerTask('default', ['jshint', 'jasmine', 'uglify', 'concat'] );
    grunt.registerTask('default', ['jshint', 'uglify', 'concat'] );
    grunt.registerTask('commit', ['jshint','uglify','concat'] );    
};