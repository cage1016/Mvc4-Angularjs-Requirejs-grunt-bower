'use strict';

require([
    'angular',
    'app',
    'domReady',
    'controllers/home-controller',
    'helpers/string',
    'bootstrap'    
],
function (angular, app, domReady) {
    var root = require.toUrl('.').split('.')[0];

    app.config([
        '$routeProvider', '$httpProvider', '$sceDelegateProvider', function ($routeProvider, $httpProvider, $sceDelegateProvider) {            
            $sceDelegateProvider.resourceUrlWhitelist(['self', '.*']);

            $routeProvider.
                when('/', {
                    templateUrl: root + 'views/Home/partials/home-index.html',
                    controller: 'HomeCtrl',
                    resolve: {
                        
                    }
                }).
                otherwise({ redirectTo: '/' });

            var $http,
                interceptor = ['$q', '$injector', function ($q, $injector) {
                    var error;

                    function success(response) {
                        // get $http via $injector because of circular dependency problem
                        $http = $http || $injector.get('$http');
                        if ($http.pendingRequests.length < 1) {
                            $('#loadingWidget').hide();
                        }
                        return response;
                    }

                    function error(response) {
                        // get $http via $injector because of circular dependency problem
                        $http = $http || $injector.get('$http');
                        if ($http.pendingRequests.length < 1) {
                            $('#loadingWidget').hide();
                        }
                        return $q.reject(response);
                    }

                    return function (promise) {
                        $('#loadingWidget').show();
                        return promise.then(success, error);
                    }
                }];

            $httpProvider.responseInterceptors.push(interceptor);

        }]).run([
        '$rootScope',
        function ($rootScope) {

            $rootScope.$safeApply = function ($scope, fn) {
                $scope = $scope || $rootScope;
                fn = fn || function () { };
                if ($scope.$$phase) {
                    fn();
                }
                else {
                    $scope.$apply(fn);
                }
            };
        }
        ]).constant('$', $);

    domReady(function () {

        angular.bootstrap(document.body, ['mvc-project']);

        $('html').addClass('ng-app: mvc-project');

    });
}
);