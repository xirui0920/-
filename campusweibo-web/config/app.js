/**
 * Created by xirui on 2017/4/17.
 */
var app=angular.module('campus', ['ngRoute','ngMaterial','ngAria','ngAnimate']);

app.controller('loginController',function($scope,$http){
    $scope.loginschoolcode="";
    $scope.loginpassword="";
    $scope.authloginError = null;
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
            localStorage.message=JSON.stringify(data);
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
});

app.controller('registerController', function($scope,$http){
    $scope.schoolcode="";
    $scope.password="";
    $scope.nickname="";
    $scope.authregError = null;


    $scope.check = function () {
        var user = {
            schoolcode:this.schoolcode,
            password:this.password,
            nickname:this.nickname
        }
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
            if(data.returnCode == "1"){
                // window.location.reload();
                $scope.authregError="注册失败!"
            }
            if(data.returnCode == "0"){
                // window.location.reload();
                // $scope.authregError="注册失败!"
                window.location.href = '#/';
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.authregError="服务器错误"
        })
    }

});

app.controller('weiboController', function($scope,$http){

    $http({
        url:'http://localhost:8080/weibo/login',
        data:'schoolcode='+JSON.parse(localStorage.message).data.schoolcode+'&'+'password='+JSON.parse(localStorage.message).data.password,
        method:'POST',
        headers:{
            'content-type':'application/x-www-form-urlencoded',
        }
    }).success(function (data, header, config, status) {
        localStorage.clear();
        // 响应成功
        localStorage.message=JSON.stringify(data);
    }).error(function (data, header, config, status) {
    })


    $scope.cusname=JSON.parse(localStorage.message).data.nickname;
    $scope.cusimg = JSON.parse(localStorage.message).data.image_url;
    // if(this.cusimg == null){
    //     $scope.cusimg = "images/avatar/default.jpg";
    // }
    $scope.cusfriendnum = JSON.parse(localStorage.message).frenum;
    $scope.cusweibonum = JSON.parse(localStorage.message).weibonum;
    $scope.weibolist = JSON.parse(localStorage.message).weiboinfo;
    $scope.userid = JSON.parse(localStorage.message).data.id;
    $scope.weibotext = "";
    
    $scope.searchinfo="";
    $scope.searchresultinfo = "";
    $scope.friendinfo="";
    $scope.friendimg="images/avatar/default.jpg";

    //发布微博
    $scope.submitState = function () {
        var weiboData = {
            text:this.weibotext,
            uid:JSON.parse(localStorage.message).data.id
        }

        $http({
            url:'http://localhost:8080/weibo/addweibo',
            data:weiboData,
            method:'POST',
            headers:{
                'content-type':'application/json',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                // $scope.authregError="该学号已经注册!"
                alert("发布失败")
            }
            if(data.returnCode == "0"){
                // window.location.href("#/");
                alert("发布成功");
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            // $scope.authregError="服务器响应失败"
        })

    }

    //搜索好友
    $scope.searchfrid = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/search',
            data:'friendinfo='+this.searchinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="未找到好友信息";
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="查找成功";
                $scope.friendinfo = data.data.nickname;
                if(data.data.image_url =='' || data.data.image_url == null){
                    $scope.friendimg = "images/avatar/default.jpg";
                }else {
                    $scope.friendimg = data.data.image_url;
                }
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.searchresultinfo="服务器响应失败"
        })
    }

    //加好友
    $scope.addfriend = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/add',
            data:'friendinfo='+this.friendinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="添加好友失败"
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="添加好友成功"
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            // $scope.authregError="服务器响应失败"
        })
    }

    $scope.replytext = "";
    $scope.weiboid="";

    $scope.addreply = function () {
        
    }


});

app.controller('myweiboController',function ($scope,$http) {
    $scope.cusname=JSON.parse(localStorage.message).data.nickname;
    $scope.cusimg = JSON.parse(localStorage.message).data.image_url;
    $scope.userid=JSON.parse(localStorage.message).data.id;
    // if(this.cusimg == null){
    //     $scope.cusimg = "images/avatar/default.jpg";
    // }
    $scope.mysearchinfo="";
    $scope.searchresultinfo = "";
    $scope.friendinfo="";
    $scope.friendimg="images/avatar/default.jpg";

    $scope.guanzhunum = "";
    $scope.fansnum = "";
    $scope.myweibolist = "";

    //加载个人微博
    $http({
        url:'http://localhost:8080/weibo/getAll',
        // data:'friendinfo='+this.mysearchinfo,
        method:'POST',
        headers:{
            // 'content-type':'application/x-www-form-urlencoded',
            'userId':$scope.userid
        }
    }).success(function (data, header, config, status) {
        // 响应成功
        $scope.myweibolist = data.myweibolist;
        $scope.guanzhunum = data.guanzhunum;
        $scope.fansnum = data.fansnum;

    }).error(function (data, header, config, status) {
        // 响应失败
        // $scope.searchresultinfo="服务器响应失败"
    });


    //搜索好友
    $scope.searchfrid = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/search',
            data:'friendinfo='+this.mysearchinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="未找到好友信息";
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="查找成功";
                $scope.friendinfo = data.data.nickname;
                if(data.data.image_url =='' || data.data.image_url == null){
                    $scope.friendimg = "images/avatar/default.jpg";
                }else {
                    $scope.friendimg = data.data.image_url;
                }
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.searchresultinfo="服务器响应失败"
        })
    }

    //加好友
    $scope.addfriend = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/add',
            data:'friendinfo='+this.friendinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="添加好友失败"
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="添加好友成功"
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            // $scope.authregError="服务器响应失败"
        })
    }
});

app.controller('settingsController',function ($scope,$http) {
    $scope.mysearchinfo="";
    $scope.searchresultinfo = "";
    $scope.friendinfo="";
    $scope.friendimg="images/avatar/default.jpg";
    $scope.userid=JSON.parse(localStorage.message).data.id;
    $scope.usercode=JSON.parse(localStorage.message).data.schoolcode;
    $scope.usernick=JSON.parse(localStorage.message).data.nickname;
    $scope.usersex=JSON.parse(localStorage.message).data.sex;
    $scope.userscl=JSON.parse(localStorage.message).data.school;

    $scope.getuserinfo = function () {
        $http({
            url:'http://localhost:8080/weibo/user/find/'+$scope.userid,
            method:'GET',
            headers:{
                userId:JSON.parse(localStorage.message).data.id,
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="未找到个人信息";
            }
            if(data.returnCode == "0"){
                $scope.usercode = data.data.schoolcode;
                $scope.usernick = data.data.nickname;
                $scope.usersex = data.data.sex;
                $scope.userscl = data.data.school;
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.searchresultinfo="服务器响应失败"
        })
    };

    //搜索好友
    $scope.searchfrid = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/search',
            data:'friendinfo='+this.mysearchinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="未找到好友信息";
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="查找成功";
                $scope.friendinfo = data.data.nickname;
                if(data.data.image_url =='' || data.data.image_url == null){
                    $scope.friendimg = "images/avatar/default.jpg";
                }else {
                    $scope.friendimg = data.data.image_url;
                }
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.searchresultinfo="服务器响应失败"
        })
    };

    //加好友
    $scope.addfriend = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/add',
            data:'friendinfo='+this.friendinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="添加好友失败"
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="添加好友成功"
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            // $scope.authregError="服务器响应失败"
        })
    };

    $scope.setnickname = "";
    $scope.setschool = "";
    $scope.setsex="";
    $scope.settingMessage="";

    $scope.userinfoset = function () {

        var setUser = {
            id:$scope.userid,
            schoolcode:$scope.usercode,
            password:JSON.parse(localStorage.message).data.password,
            nickname:$scope.setnickname,
            image_url:JSON.parse(localStorage.message).data.image_url,
            sex:$scope.setsex,
            school:$scope.setschool
        }

        $http({
            url:'http://localhost:8080/weibo/user/addOrUpdate',
            data:setUser,
            method:'POST',
            headers:{
                'content-type':'application/json',
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.settingMessage="更新失败!";
            }
            if(data.returnCode == "0"){
                $scope.settingMessage="更新成功";
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.settingMessage="服务器响应错误"
        })

    };

    $scope.oldpwd = "";
    $scope.newpwd = "";

    $scope.userpwdset = function () {

        var setUser = {
            id:$scope.userid,
            schoolcode:$scope.usercode,
            password:$scope.newpwd,
            nickname:$scope.setnickname,
            sex:$scope.setsex,
            school:$scope.setschool
        }

        $http({
            url:'http://localhost:8080/weibo/user/addOrUpdate',
            data:setUser,
            method:'POST',
            headers:{
                'content-type':'application/json',
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.settingMessage="更新失败!";
            }
            if(data.returnCode == "0"){
                $scope.settingMessage="更新成功";
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.settingMessage="服务器响应错误"
        })

    };

});

app.controller('friendController',function ($scope,$http) {
    $scope.mysearchinfo="";
    $scope.searchresultinfo = "";
    $scope.friendinfo="";
    $scope.friendimg="images/avatar/default.jpg";
    $scope.userid=JSON.parse(localStorage.message).data.id;
    $scope.friendlist = "";

    $http({
        url:'http://localhost:8080/weibo/friend/getAll/'+$scope.userid,
        method:'GET',
        headers:{
            userId:JSON.parse(localStorage.message).data.id,
        }
    }).success(function (data, header, config, status) {
        // 响应成功
        if(data.returnCode == "1"){
            alert("好友列表获取失败");
        }
        if(data.returnCode == "0"){
            $scope.friendlist = data.data;
        }
    }).error(function (data, header, config, status) {
        alert("服务器响应错误");
    });

    //搜索好友
    $scope.searchfrid = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/search',
            data:'friendinfo='+this.mysearchinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="未找到好友信息";
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="查找成功";
                $scope.friendinfo = data.data.nickname;
                if(data.data.image_url =='' || data.data.image_url == null){
                    $scope.friendimg = "images/avatar/default.jpg";
                }else {
                    $scope.friendimg = data.data.image_url;
                }
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            $scope.searchresultinfo="服务器响应失败"
        })
    };

    //加好友
    $scope.addfriend = function () {
        $http({
            url:'http://localhost:8080/weibo/friend/add',
            data:'friendinfo='+this.friendinfo,
            method:'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'userId':$scope.userid
            }
        }).success(function (data, header, config, status) {
            // 响应成功
            if(data.returnCode == "1"){
                $scope.searchresultinfo="添加好友失败"
            }
            if(data.returnCode == "0"){
                $scope.searchresultinfo="添加好友成功"
            }
        }).error(function (data, header, config, status) {
            // 响应失败
            // $scope.authregError="服务器响应失败"
        })
    };




});