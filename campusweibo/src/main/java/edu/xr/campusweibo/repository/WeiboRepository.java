package edu.xr.campusweibo.repository;

import edu.xr.campusweibo.domain.Weibo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by xirui on 2017/5/20.
 */
public interface WeiboRepository extends JpaRepository<Weibo,Long> {

    @Query(value = "Select * from w_weibo weibo WHERE weibo.uid=?1 ORDER BY weibo.create_date DESC ",nativeQuery = true)
    List<Weibo> findAllByUid(Long id);

    Weibo findByTextAndUid(String text,Long uid);
}
