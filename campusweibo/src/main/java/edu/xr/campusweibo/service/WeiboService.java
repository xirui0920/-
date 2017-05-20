package edu.xr.campusweibo.service;

import edu.xr.campusweibo.domain.Weibo;
import edu.xr.campusweibo.repository.WeiboRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
 * Created by xirui on 2017/5/20.
 */
@Service
public class WeiboService {
    private static final Logger logger = LoggerFactory.getLogger(WeiboService.class);

    @Autowired
    private WeiboRepository weiboRepository;

    public int getWeiboNum(Long id){
        int num=0;
        List list = weiboRepository.findAllByUid(id);
        if (list != null){
            num = list.size();
        }else {
            logger.info("未找到微博============");
        }
        return num;
    }

    public List<Weibo> getAllWeibo(Long id){
        List list = weiboRepository.findAllByUid(id);
        if (list == null){
            logger.info("未查到微博=============");
            return null;
        }
        return list;
    }

    public Weibo getWeiboByText(String text,Long uid){
        return weiboRepository.findByTextAndUid(text,uid);
    }

    public void addWeibo(Weibo weibo){
        if (StringUtils.isEmpty(weibo.getText()) || StringUtils.isEmpty(weibo.getUid()) ){
            logger.info("微博信息不完整，拒绝发布");
            return;
        }
        Weibo addWeibo = new Weibo();
        addWeibo.setText(weibo.getText());
        addWeibo.setUid(weibo.getUid());
        try {
            weiboRepository.save(addWeibo);
        }catch (Exception e){
            logger.info("发布失败============");
        }
    }


}
