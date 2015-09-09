(function() {

    var appFactories = angular.module('appFactories', []);

    appFactories.factory('managefac', function($http) {
        var basefolder = '../api/';
        return {
            indexfac: function(callback) {
            //    alert(1);
            },
            loginfac: function(callback) {
            //    alert(2);
            }, 
            userlist: function(callback) {
                //alert(3);
                $http({
                    method: 'GET', 
                    url: basefolder +'users',
                    cache: true
                }).success(callback);
                
                /*
                .then(function(result) {
                    //alert(result.data);
                    $scope.test = "doesn't work";
                    $scope.$apply(function() {
                        $scope.test = "It' works.";
                    });
                    return result;
                });
*/
            }, 
            userDetailfac: function(userid, callback) {
                $http({
                    method: 'GET', 
                    url: basefolder + 'user?userid='+ userid,
                    cache: true
                }).success(callback);
            },
            userInsert: function(detailData, callback) {
                $http({
                    method: 'POST',
                    url: basefolder + 'insertUser',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: detailData,
                    cache: true
                }).then(function(result) { 
                    return result.data;
                });
            },
            userUpdate: function(userid, detailData, callback) {
                var req = {
                    method: 'POST',
                    url: basefolder + 'updateUser',
                    headers: {
                        'Content-Type': undefined
                    },
                    data: {
                        userid: userid,
                        detailData: detailData
                    },
                    cache: true
                    }

                $http(req).then(
                    function(status) {
                        return status.data;
                    }
                );
            },
            userDelete: function(userid, callback) {
                $http({
                    method: 'DELETE',
                    url: basefolder + 'deleteUser?userid='+ userid,
                    headers: {
                        'Content-Type': undefined
                    },
                    //data: {userid:userid},
                    cache: true
                }).then(function(status) {
                    return status.data;
                });
            },
            templatefac: function(callback) {
            //    alert(4);
            },
            pagefac: function(callback) {
            //    alert(5);
            }
        }
    });

    /*
    appFactories.factory("errors", function($rootScope) {
        return {
            catch: function(message) {
                alert(2);
                 return function(reason) {
                     $rootScope.addError({message:message, reason:reason});
                 }
            }
        };
    });

    appFactories.factory('$exceptionHandler', function($rootScope) {
        return function(exception, cause) {
            //alert(exception.message);
            exception.message += ' (caused by "'+ cause +'")';
           // throw exception;
           //return exception.message;
        };
    });
    */

    appFactories.factory("manageLogin", ['$http', '$cookieStore', '$rootScope', '$exceptionHandler', function($http, $cookieStore, $rootScope, $exceptionHandler) {
        var obj = {};
        var basefolder = "../api/";

        obj.isLogin = function() {
            return $http.get(basefolder + 'isLogin');
        };

        obj.login = function(username, password) {

            return $http.post(basefolder + 'login', {username: username, password: password}).then(function(result) {
                return result;
                /*
                try {
                    //alert(result.status+"|"+result.data.msg);
                    alert(errors);
                    if(result.status != '200') {
                       throw {message: result.data.msg};
                    } else {
                        return response;
                    }

                    callback(response);
                } catch(e) {
                    //alert("e:"+e);
                    $exceptionHandler(e); 
                }
                */
                //return result;
            });
            
        };

        obj.setBaseLogInfo = function(username, password) {
            var authdata = Base64.encode(username +':'+ password);
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    password: password
                }
            }
        };

        obj.clearBaseLogInfo = function() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }

        obj.logout = function() {
            return $http.post(basefolder + 'logout');
        }

        return obj;
    }]);

    appFactories.factory("manageUser", ['$http', function($http) {
        
            var obj = {};
            var basefolder = "../api/";

            obj.getUsers = function() {
                return $http.get(basefolder + 'users');
            };

            obj.getUserDetail = function(userid) {
                return $http.get(basefolder + 'user?userid='+ userid);
            };

            obj.userInsert = function(detailData) {
                return $http.post(basefolder +'insertUser', detailData).then(function(results) {
                    //alert(results.data);
                    return results;
                });
            };

            obj.userUpdate = function(userid, detailData, action) {
                return $http.post(basefolder + 'updateUser', {userid: userid, detailData:detailData, action:action}).then(function(results) {
                    //alert(results);
                    return results;
                });
            };

            obj.userDelete = function(userid) {
                return $http.delete(basefolder + 'deleteUser?userid='+ userid).then(function(results) {
                    return results;
                });
            };
        return obj;
    }]);

    appFactories.factory("manageTemplate", ['$http', function($http) {

        var obj = {};
        var basefolder = "../api/";

        obj.getTemplates = function() {
            return $http.get(basefolder + 'templates');
        };

        obj.getTemplateDetail = function(template_id) {
            return $http.get(basefolder + 'template?template_id='+ template_id);
        }

        obj.templateInsert = function(detailData) {
            return $http.post(basefolder +'insertTemplate', detailData).then(function(results) {
                //alert(results.data);
                return results;
            });
        };

        obj.templateUpdate = function(template_id, detailData) {
            return $http.post(basefolder + 'updateTemplate', {template_id: template_id, detailData:detailData}).then(function(results) {
                //alert(results);
                return results;
            });
        };

        obj.templateDelete = function(template_id) {
            return $http.delete(basefolder + 'deleteTemplate?template_id='+ template_id).then(function(results) {
                return results;
            });
        };
        return obj;

    }]);

    appFactories.factory("manageFile", ['$http', function($http) {
        var obj = {};
        var basefolder = "../api/";

        obj.sendfile = function() {
            return $http.get(basefolder + 'fileUploader');
        };

        return obj;
    }]);

    appFactories.factory("handlerError", ['$rootScope', function($rootScope) {
        var obj = {};

        obj.Success = Success;
        obj.Error = Error;

        initService();

        return obj;

        function initService() {
            $rootScope.$on('$locationChangeStart', function() {
                clearMessage();
            });

            function clearMessage() {
                var handle = $rootScope.handle;
                if(handle) {
                    if(!handle.keepAfterLocationChange) {
                        delete $rootScope.handle;
                    } else {
                        handle.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.handle = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.handle = {
                message: message, 
                type: 'error', 
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

    }]);

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();