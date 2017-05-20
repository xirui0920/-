package edu.xr.campusweibo.repository;

import edu.xr.campusweibo.domain.Weibo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by xirui on 2017/5/20.
 */
public interface WeiboRepository extends JpaRepository<Weibo,Long> {
    List<Weibo> findAllByUid(Long id);
    Weibo findByTextAndUid(String text,Long uid);
}
