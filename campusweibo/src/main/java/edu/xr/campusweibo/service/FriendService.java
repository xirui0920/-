package edu.xr.campusweibo.service;

import edu.xr.campusweibo.domain.Friend;
import edu.xr.campusweibo.repository.FriendRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xirui on 2017/5/20.
 */
@Service
public class FriendService {

    private static final Logger logger = LoggerFactory.getLogger(FriendService.class);

    @Autowired
    private FriendRepository friendRepository;


    public int getFridNum(Long id){
        int num=0;
        List list = friendRepository.findAllByUid(id);
        if (list != null){
            num = list.size();
        }else {
            logger.info("未找到好友============");
        }
        return num;
    }

    public List<Friend> getAllFrid(Long id){
        List list = friendRepository.findAllByUid(id);
        if (list == null){
            logger.info("未查到好友=============");
            return null;
        }
        return list;
    }

    public void addFriend(Friend friend){
        friendRepository.save(friend);
    }

    public boolean isExist(Friend friend){
        Friend flag = friendRepository.findByUidAndFuid(friend.getUid(),friend.getFuid());
        if (flag == null){
            return true;
        }
        return false;
    }
}
