require.config({
    baseUrl: "/mvc-project/public/js",
    waitSeconds: 200,
    paths: {
        'domReady': 'vendor/requirejs-domready/domReady',

        'angular': 'vendor/angular/angular',
        'angular.zh-tw': 'vendor/angular-i18n/angular-locale_zh-tw',
        'angular.route': 'vendor/angular-route/angular-route',
        'angular.resource': 'vendor/angular-resource/angular-resource',
        'angular.animate': 'vendor/angular-animate/angular-animate',        
        'angular.sanitize': 'vendor/angular-sanitize/angular-sanitize',

        'moment': 'vendor/moment/moment',
        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        
        'jquery': 'vendor/jquery/jquery',

        'respond': 'vendor/respond/dest/respond.src',
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