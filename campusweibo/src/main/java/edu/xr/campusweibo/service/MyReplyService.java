package edu.xr.campusweibo.service;

import edu.xr.campusweibo.domain.MyReply;
import edu.xr.campusweibo.repository.MyReplyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xirui on 2017/5/22.
 */
@Service
public class MyReplyService {

    private static final Logger logger = LoggerFactory.getLogger(MyReplyService.class);

    @Autowired
    private MyReplyRepository myReplyRepository;

    public List<MyReply> getAllReply(Long id){
        List list = myReplyRepository.findAllByWid(id);
        if (list == null){
            logger.info("未查到微博=============");
            return null;
        }
        return list;
    }
}
