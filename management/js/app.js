(function() {
    
    var app = angular.module('app', ['ngRoute', 'ngCookies', 'angularFileUpload', 'appControllers', 'appFactories']);

    app.config(function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/index_body.html',
                controller: 'indexCtrl'
            }).
            when('/login', {
                templateUrl: 'template/login.html',
                controller: 'loginCtrl'
            }).
            when('/user', {
                templateUrl: 'template/user/user.html',
                controller: 'userCtrl'
            }).
            when('/user-detail/:userid', {
                templateUrl: 'template/user/user_view.html',
                controller: 'userDetailCtrl'
            }).
            when('/user-pass/:userid', {
                templateUrl: 'template/user/user_pass.html',
                controller: 'userDetailCtrl'
            }).
            when('/user-site/:userid', {
                templateUrl: 'template/user/user_site.html',
                controller: 'userSiteCtrl'
            }).
            when('/template', {
                templateUrl: 'template/template/template.html',
                controller: 'templateCtrl'
            }).
            when('/template-detail/:template_id', {
                templateUrl: 'template/template/template_view.html',
                controller: 'templateDetailCtrl'
            }).
            when('/page', {
                templateUrl: 'template/page.html',
                controller: 'pageCtrl'
            }).
            when('/upload', {
                templateUrl: 'template/common/upload.html'
                //controller: 'uploadCtrl'
            }).
            when('/404', {
                controller: 'Error404Controller',
                templateUrl: 'template/error/Error404.html'
            }).
            otherwise({
                redirectTo: '/404'
            })
    });
/*
    app.config(function($provide) {
        $provide.decorator("$exceptionHandler", function($delegate, $injector) {
            return function(exception, cause) {
                //alert("exception:"+ exception +", cause:"+ cause);
                var $rootScope = $injector.get("$rootScope");
                $rootScope.addError({message:"Exception", reason:exception});
                $delegate(exception, cause);
            };
        });
    });
*/
    app.run(['$location', '$rootScope', 'manageLogin', function($location, $rootScope, manageLogin) {
        $rootScope.$on('$routeChangeSuccess', function(event) {
           
            manageLogin.isLogin().then(function(status) {
                //alert(status.data.isLogin +"||"+ status.data.username);
                //$rootScope.error_content = status;
                if(status.data.isLogin == "false") {
                    $rootScope.viewLogin    = "true";
                    $rootScope.viewLogout   = "false";
                    $location.path('/login');
                } else {
                    //$rootScope.USERID = status.data.user_info.user_login;
                    $rootScope.viewLogin    = "false";
                    $rootScope.viewLogout   = "true";
                }

                if(status.data.user_info.user_status === '0') {
                    $rootScope.viewAmenu = "true";
                } else if (status.data.user_info.user_status === '1') {
                    $rootScope.viewAmenu = "false";
                } else {
                    $location.path('/404');
                }

            });
            
            $rootScope.actLogout = actLogout;

            function actLogout() {
                if(confirm("Are you sure to logout?")==true) {
                    manageLogin.logout().then(function() {
                        $location.path('/login');
                    });
                }
            }

        });
    }]);

})();