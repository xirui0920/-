package edu.xr.campusweibo.config;

/**
 * Application constants.
 */
public final class Constants {

    //Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";

    //成功标示
    public final static int SUCCESS_CODE = 0;

    //失败标志
    public final static int FAIL_CODE = 1;

    public  final static String SEESION_STORE_USERINFO_KEY = "userInfo";

    public final static String REQUEST_HEADER_INFO_KEY = "userId";

    //注册用户已存在
    public final static String USER_ADD_EXIST = "0008";

    //用户更新添加失败
    public final static  String USER_ADD_UPDATE_EXP="0007";

    //用户信息查询异常
    public final static String USER_QUARY_EXP = "0006";

    //注销异常
    public final static String LOGOUT_OCCUR_EXCEPTION = "0005";

    //登录过期或者没有权限访问该资源，请重新登录......
    public final static String SESSION_TIMEOUT_OR_NO_AUTHORITY = "0004";

    //账号或密码信息为空
    public final static String LOGIN_USERNAME_OR_PASSWORD_IS_BLANK = "0003";

    //用户登录发生异常
    public final static String LOGIN_OCCUR_EXCEPTION = "0002";

    //用户不存在或者账号密码错误
    public final static String LOGIN_USER_NOT = "0001";

    //成功信息
    public final static String SUCCESS_INFO = "0000";

    public final static String FAIL_INFO= "1111";

    private Constants() {
    }
}
