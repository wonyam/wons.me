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

    appControllers.controller('userSiteCtrl', function($scope, manageUser) {

    });

    appControllers.controller('uploadCtrl', function($scope, FileUploader, manageFile) {
        
        var uploader = $scope.uploader = new FileUploader( function() {
            alert(1); 
            //url: 'upload.php'
            //manageFile.sendfile()

        });
    
        var uploader = $scope.uploader

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
