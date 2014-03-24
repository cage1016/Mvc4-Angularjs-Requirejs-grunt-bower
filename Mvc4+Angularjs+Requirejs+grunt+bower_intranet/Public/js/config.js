require.config({
    baseUrl: "/mvc-project/public/js",
    waitSeconds: 200,
    paths: {
        'domReady': 'bower_components/requirejs-domready/domReady',

        'angular': 'bower_components/angular/angular',
        'angular.zh-tw': 'bower_components/angular-i18n/angular-locale_zh-tw',
        'angular.route': 'bower_components/angular-route/angular-route',
        'angular.resource': 'bower_components/angular-resource/angular-resource',
        'angular.animate': 'bower_components/angular-animate/angular-animate',        
        'angular.sanitize': 'bower_components/angular-sanitize/angular-sanitize',

        'moment': 'bower_components/moment/moment',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        
        'jquery': 'bower_components/jquery/jquery',

        'respond': 'bower_components/respond/dest/respond.src',        
    },
    shim: {
        'angular': {
            deps: ['jquery', 'moment'],
            exports: 'angular'
        },
        'angular.zh-tw': ['angular'],
        'angular.route': ['angular'],
        'angular.resource': ['angular'] ,
        'angular.sanitize': ['angular'],
        'angular.animate': ['angular'],
        
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'respond': {
            exports: 'respond'
        }        
    },
    urlArgs: "bust=" + (new Date()).getTime()
    //urlArgs: "bust=v7"
});