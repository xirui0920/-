/**
 * Created by xirui on 2017/4/17.
 */
var app=angular.module('campus', ['ngRoute','ngMaterial','ngAria','ngAnimate']);

app.controller('loginController', function($scope,$http){
    $scope.schoolcode="";
    $scope.password="";
    $scope.authError = null;
    $scope.login = function () {
            $http({
                url:'http://localhost:8080/weibo/login',
                data:'schoolcode='+this.schoolcode+'&'+'password='+this.password,
                method:'POST',
                headers:{
                    'content-type':'application/x-www-form-urlencoded',
                }
            }).success(function (data, header, config, status) {
                // 响应成功
                localStorage.message=JSON.stringify(data);
                window.location.href="#/weibo";
            }).error(function (data, header, config, status) {
                // 响应失败
                $scope.authError="账号或密码错误,或者服务器错误"
            })
    }
});

app.controller('registerController', function($scope,$http){
    
    $scope.returnLogin = function () {
        window.location.href="#/";
    }
    
    $scope.check = function () {

    }

});

app.controller('weiboController', function($scope,$http){

});

app.controller('myweiboController',function ($scope,$http) {

});


