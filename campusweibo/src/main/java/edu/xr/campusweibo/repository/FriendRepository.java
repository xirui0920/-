package edu.xr.campusweibo.repository;

import edu.xr.campusweibo.domain.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend,Long> {
    List<Friend> findAllByUid(Long id);
}
