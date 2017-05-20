package edu.xr.campusweibo.web.rest;

import edu.xr.campusweibo.config.Constants;
import edu.xr.campusweibo.domain.Weibo;
import edu.xr.campusweibo.service.WeiboService;
import edu.xr.campusweibo.web.rest.util.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xirui on 2017/5/20.
 */
@RestController
@RequestMapping("/weibo")
public class WeiboResource {
    private final Logger log = LoggerFactory.getLogger(WeiboResource.class);

    private final WeiboService weiboService;

    public WeiboResource(WeiboService weiboService) {
        this.weiboService = weiboService;
    }


    @RequestMapping(value = "/addweibo",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseResult createWeibo(@RequestBody Weibo weibo){
        log.info("创建微博"+weibo.toString());
        Weibo nWeibo = weiboService.getWeiboByText(weibo.getText(),weibo.getUid());
        if (nWeibo != null){
            log.info("此用户微博已存在，请勿重复发表");
            return new ResponseResult(Constants.FAIL_CODE,Constants.FAIL_INFO);
        }
        try {
            weiboService.addWeibo(weibo);
        }catch (Exception e){
            log.info("发布微博异常");
            return new ResponseResult(Constants.FAIL_CODE,Constants.FAIL_INFO);
        }
        return new ResponseResult(Constants.SUCCESS_CODE,Constants.SUCCESS_INFO);
    }
}
