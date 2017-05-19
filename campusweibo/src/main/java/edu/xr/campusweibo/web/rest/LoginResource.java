package edu.xr.campusweibo.web.rest;

import edu.xr.campusweibo.config.Constants;
import edu.xr.campusweibo.domain.MyUser;
import edu.xr.campusweibo.service.LoginService;
import edu.xr.campusweibo.web.rest.util.ResponseData;
import edu.xr.campusweibo.web.rest.util.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Created by xirui on 2017/4/18.
 */
@RestController
@RequestMapping("/weibo")
public class LoginResource {

    private final Logger log = LoggerFactory.getLogger(LoginResource.class);

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult login(HttpServletRequest request, HttpServletResponse response) throws Exception{
        log.info("用户开始登陆...................");
        String schoolcode = request.getParameter("schoolcode");
        String password = request.getParameter("password");
        if (!StringUtils.hasText(schoolcode) || !StringUtils.hasText(password)){
            log.info("login信息异常");
            return new ResponseResult(Constants.FAIL_CODE,Constants.LOGIN_USERNAME_OR_PASSWORD_IS_BLANK);
        }
        log.info("开始登陆，登陆学号为 = " + schoolcode);
        MyUser u = null;
        try {
            u = loginService.findBySchoolcodeAndPassword(schoolcode,password);
        }catch (Exception e){
            log.info("登陆异常:",e);
            return new ResponseResult(Constants.FAIL_CODE,Constants.LOGIN_OCCUR_EXCEPTION);
        }
        if (u == null){
            log.info("登陆异常");
            return new ResponseResult(Constants.FAIL_CODE,Constants.LOGIN_USER_NOT);
        }
        log.info("用户登陆成功.....");
        request.getSession().setAttribute(Constants.SEESION_STORE_USERINFO_KEY,u);
        return new ResponseData<MyUser>(Constants.SUCCESS_CODE,Constants.SUCCESS_INFO,u);
    }

    // 用户注销
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult logout(HttpServletRequest request,
                             HttpServletResponse response) {
        log.info("user logout ..............................");
        try {
            request.getSession().invalidate();
        } catch (Exception e) {
            log.error("user logout appear exception!", e);
            return new ResponseResult(Constants.FAIL_CODE, Constants.LOGOUT_OCCUR_EXCEPTION);
        }
        return new ResponseResult(Constants.SUCCESS_CODE, Constants.SUCCESS_INFO);
    }

}
