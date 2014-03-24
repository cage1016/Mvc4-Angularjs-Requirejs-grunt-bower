define([
    'angular',
    'respond',

    'controllers/controllers',
    'filters/filters',
    'directives/directives',
    'services/services',

    'angular.route',
    'angular.resource',
    'angular.sanitize',
    'angular.animate',
    'angular.zh-tw'
], function (angular) {

    return angular.module('mvc-project', [
        'controllers',
        'filters',
        'directives',
        'services',

        'ngRoute',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ngLocale'
    ]);
});