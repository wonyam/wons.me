(function() {

    var appControllers = angular.module('appControllers', []);

    appControllers.controller('indexCtrl', function($scope, $rootScope, $location) {
        
        $scope.goSite = function(siteUrl) {
            $location.path('/'+siteUrl);
        };

        $rootScope.isSite = "false";
    });
    

    appControllers.controller('siteCtrl', function($scope, $rootScope, $http, $location) {
        $rootScope.isSite = "true";
        //$rootScope.cssurl = "wons_yellowishgreen";
        //$rootScope.cssurl = "wons_mint";
        //$rootScope.cssurl = "wons_purple";
        //$rootScope.cssurl = "wons_blue";
        //$rootScope.cssurl = "wons_gray";
        //$rootScope.cssurl = "wons_orange";
        //$rootScope.cssurl = "wons";
        $scope.headUrl = 'sites/template/header.html';
        $scope.aboutUrl = 'sites/template/about.html';
        $scope.portfolioUrl = 'sites/template/portfolio.html';
        //alert($scope.headurl);
        $scope.portfolioModelUrl = 'sites/template/portfolio_model.html';
        $scope.careerUrl = 'sites/template/career.html';
        $scope.teamUrl = 'sites/template/team.html';
        $scope.contactUrl = 'sites/template/contact.html';
    });
})();