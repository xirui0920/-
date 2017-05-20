package edu.xr.campusweibo.repository;

import edu.xr.campusweibo.domain.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by xirui on 2017/4/26.
 */
public interface MyUserRepository  extends JpaRepository<MyUser,Long>{
    MyUser findBySchoolcode(String schoolcode);
    MyUser findBySchoolcodeAndPassword(String schoolcode,String password);
    MyUser findById(Long id);
}
