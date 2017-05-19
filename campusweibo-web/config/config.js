/**
 * Created by xirui on 2017/4/17.
 */
app.config([
    '$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'login.html',
                controller:'loginController'
            })
            .when('/weibo',{
                templateUrl:'weibo.html',
                controller:'weiboController'
            })
/*            .when('/register',{
                templateUrl:'register.html',
                controller:'registerController'
            })*/
            .when('/myweibo',{
                templateUrl:'myweibo.html',
                controller:'myweiboController'
            })
    }
]);