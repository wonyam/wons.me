(function() {
    
    var appControllers = angular.module('appControllers', []);

    appControllers.controller('indexCtrl', function($scope, manageUser) {
        //alert(1);

        //alert(manageUser.isLogin());
        // managefac.indexfac(function(indexfac) {
        //     $scope.indexfac = indexfac;
        // });

    });


    appControllers.controller('loginCtrl', function($scope, $location, manageLogin, handlerError) {

        $scope.actLogin = actLogin;

        (function initController() {
            //alert("initController");
            manageLogin.clearBaseLogInfo();
        })();
        
        function actLogin() {

             //$timeout(function() {
                var response;
                manageLogin.login($scope.username, $scope.password)
                    .then(function(response) {

                        if(response.status == '200') {
                            manageLogin.setBaseLogInfo(username, password);
                            $location.path('/');
                           //alert(response);
                        } else {
                            handlerError.Error(response.data.msg);
                        }

                    });
            //}, 1000);
        }

    });

    appControllers.controller('userCtrl', function($scope, manageUser, handlerError) {
        manageUser.getUsers().then(function(response) {
            setData($scope, '','userlist', response, handlerError);
        }); 
        
    });

    appControllers.controller('userDetailCtrl', function($scope, $routeParams, $location, manageUser, handlerError) {
        var userid = ($routeParams.userid) ? parseInt($routeParams.userid) :0;

        $scope._userid= userid;
        isViewPass($scope, userid);

        manageUser.getUserDetail(userid).then(function(response) {
            setData($scope, '','detailData', response, handlerError);
        });

        $scope.saveUser = function(detailData) {
            if(userid <= 0) {
                manageUser.userInsert(detailData).then(function(response) { 
                    setData($scope, $location, '/user', response, handlerError);
                });
            } else {
                manageUser.userUpdate(userid, detailData, '0').then(function(response) {
                    setData($scope, $location, '/user', response, handlerError);
                });            
            }
        };

        $scope.deleteUser = function(userid) {
            if(confirm("Are you sure to delete this user: "+ userid) == true) {
                manageUser.userDelete(userid).then(function(response) {
                    setData($scope, $location, '/user', response, handlerError);
                });
            }
        };

        $scope.savePass = function(detailData) {
            if(confirm("Are your sure to change this password?") == true) {
                manageUser.userUpdate(userid, detailData, '1').then(function(response) {
                    setData($scope, $location, '/user', response, handlerError);
                });
            }
        };

        $scope.cancle = function() {
            $location.path('/user');
        };
    });

    /* for fileupload */
    appControllers.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    appControllers.controller('userSiteCtrl', function($scope, $routeParams, $location, manageUser, handlerError) {
        var userid = parseInt($routeParams.userid) ? ($routeParams.userid) : 0;

        manageUser.getUserDetail(userid).then(function(response) {
            $scope.userlogin = response.data.user_login;
        });

          var param = function(data) {
                var returnString = '';
                for (d in data){
                    if (data.hasOwnProperty(d))
                       returnString += d + '=' + data[d] + '&';
                }
                // Remove last ampersand and return
                return returnString.slice( 0, returnString.length - 1 );
          };

        $scope.saveUserSite = function(detailData) {
            var file = $scope.myFile;
            var file_data = new FormData();
            file_data.append('file',            file);
            file_data.append('user_id',         userid);
            for (d in detailData) {
                if (detailData.hasOwnProperty(d)) {
                    file_data.append(d,        detailData[d]);
                }
            }
            //file_data.append('dData', param(detailData));
            //file_data.append('detailData', angular.toJson(detailData));
            //alert(detailData.site_css);
            //alert(JSON.stringify(detailData));
                //$scope.error_content = file;
            manageUser.userSiteInsert(file_data).then(function(response) {
                //$scope.error_content = response;
                setData($scope, $location, '/user', response, handlerError);
            });
        };

        $scope.cloaseUserSite = function(userid) {
            if(confirm("Are you sure to close this site?")) {
                manageUser.userSiteClose().then(function(response) {
                    setData($scope, $location, '/usser', response, handlerError);
                });
            }
        };

        $scope.cancle = function() {
            $location.path('/user');
        };


       // $scope.userlogin = userid;
    });

    appControllers.controller('templateCtrl', function($scope, manageTemplate, handlerError) {
        manageTemplate.getTemplates().then(function(response) {
            setData($scope, '', 'templateList', response, handlerError);
        });
    });

    appControllers.controller('templateDetailCtrl', function($scope, $routeParams, $location, manageTemplate, handlerError) {
        var template_id = ($routeParams.template_id) ? parseInt($routeParams.template_id) : 0;
        $scope._template_id = template_id;

        isViewPass($scope, template_id);

        manageTemplate.getTemplateDetail(template_id).then(function(response) {
            setData($scope, '','templateDetailData', response, handlerError);
        });


        $scope.saveTemplate = function(detailData) {
            //alert(detailData);
            if(template_id <= 0) {
                manageTemplate.templateInsert(detailData).then(function(response) { 
                    setData($scope, $location, '/template', response, handlerError);
                });
            } else {
                manageTemplate.templateUpdate(template_id, detailData).then(function(response) {
                    setData($scope, $location, '/template', response, handlerError);
                });            
            }
        };

        $scope.deleteTemplate = function(template_id) {
            if(confirm("Are you sure to delete this template: "+ template_id) == true) {
                manageTemplate.templateDelete(template_id).then(function(response) {
                    setData($scope, $location, '/template', response, handlerError);
                });
            }
        };

        $scope.cancle = function() {
            $location.path('/template');
        };
    
    });


    appControllers.controller('uploadCtrl', function($scope, FileUploader, manageFile) {
        
        var uploader = $scope.uploader = new FileUploader( function() {
            alert(1); 
            //url: 'upload.php'
            //manageFile.sendfile()

        });

    
        //var uploader = $scope.uploader = manageFile.sendfile();

        // FILTERS
 
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
           // alert(1);
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {uploader
           // alert(2);
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {uploader
           // alert(3);
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {uploader
           // alert(4);
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {uploader
           // alert(5);
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {uploader
           // alert(6);
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {uploader
           // alert(7);
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {uploader
           // alert(8);
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {uploader
           // alert(9);
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {uploader
           // alert(10);
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    });

    appControllers.controller('pageCtrl', function($scope, managefac) {
        managefac.pagefac(function(pagefac) {
            $scope.pagefac = pagefac;
        });
    });

    /* common functions */
    function setData($scope, $location, varData, response, handlerError) {
        //alert(data.data.msg);
        //$scope.error_content = response;
        if(response.status == '200') {
            if(varData.indexOf('/') >=0) {
                $location.path(varData);
            } else {
                $scope[varData] = response.data;
            }
            //$scope.alldata = response;
        } else {
            handlerError.Error(response.data.msg);
                //$scope.error_content = response;
        }
    }

    function isViewPass($scope, id) {
        if(id != 0) {
            $scope.viewPass = false;
        } else {
            $scope.viewPass = true;
        }
    }


})();
