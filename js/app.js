(function() {

    var siteapp = angular.module('siteapp', ['ngRoute', 'appControllers']);

    siteapp.config(function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/index_body.html', 
                controller: 'indexCtrl'
            }).
            when('/:siteurl', {
                templateUrl: 'sites/template/index_body.html',
                controller:'siteCtrl'
            }).
            when('/404', {
                templateUrl: 'template/404.html',
            }).
            otherwise({
                redirectTo:'/404'
            })
    });

    siteapp.run(['$rootScope', function($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function(event) {

            //$rootScope.cssurl = "wons_yellowishgreen";
            $rootScope.cssurl = "wons";
        });
    }]);

})();