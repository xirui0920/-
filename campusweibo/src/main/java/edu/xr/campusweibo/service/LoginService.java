package edu.xr.campusweibo.service;

import edu.xr.campusweibo.domain.MyUser;
import edu.xr.campusweibo.repository.MyUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by xirui on 2017/4/26.
 */
@Service
public class LoginService {

    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    private MyUserRepository myUserRepository;

    public MyUser findBySchoolcodeAndPassword(String schoolcode,String password){
        return myUserRepository.findBySchoolcodeAndPassword(schoolcode,password);
    }

    public MyUser getUserById(Long id){
        return myUserRepository.findById(id);
    }
}
