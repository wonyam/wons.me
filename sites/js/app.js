(function() {

    var app = angular.module('app', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider.
        when('/', {

        }).
        when('/:user', {
            templateUrl:'template/',
            controller:''
        }).
        otherwise({
            redirectTo: '/404'
        })
    });


})();