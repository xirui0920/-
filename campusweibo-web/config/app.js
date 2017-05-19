/**
 * Created by xirui on 2017/4/17.
 */
var app=angular.module('campus', ['ngRoute','ngMaterial','ngAria','ngAnimate']);

app.controller('loginController',['$scope','$http', function($scope,$http){
    $scope.loginschoolcode="";
    $scope.loginpassword="";

    $scope.regschoolcode="";
    $scope.regnickname="";
    $scope.regpassword="";

    $scope.authloginError = null;
    $scope.authregError = null;
    $scope.login = function () {
        $http({
            url:'http://localhost:8080/weibo/login',
            data:'schoolcode='+this.loginschoolcode+'&'+'password='+this.loginpassword,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            sessionStorage.message=JSON.stringify(data);
            if(data.returnCode == "0"){
                window.location.href="#/weibo";
            }else {
                $scope.authloginError="账号或密码错误"
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.authloginError="服务器错误"
        })
    }

    var user = {
        schoolcode:$scope.regschoolcode,
        password: $scope.regpassword,
        nickname:$scope.regnickname,
        imageUrl:null,
        sex:null,
        school:null
    }

    $scope.check = function () {
        alert($scope.regschoolcode);
        $http({
            url:'http://localhost:8080/weibo/user/addOrUpdate',
            data:user,
            method:'POST',
            headers:{
                'content-type':'application/json',
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnInfo == "0008"){
                $scope.authregError="该学号已经注册!"
            }
            if(data.returnInfo == "0000"){
                window.location.reload();
            }
            if(data.returnCode == "1"){
                // window.location.reload();
                $scope.authregError="注册失败!"
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.authregError="服务器错误"
        })
    }
}]);

app.controller('registerController', function($scope,$http){

});

app.controller('weiboController', function($scope,$http){

});

app.controller('myweiboController',function ($scope,$http) {

});


