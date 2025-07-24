package com.mini_sns.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mini_sns.backend.entity.Follow;
import com.mini_sns.backend.entity.FollowId;

public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    List<Follow> findByFollower_MemberId(Long followerId);

    boolean exiexistsByFollower_MemberIdAndFollowing_MemberId(Long followerId, Long followingId);

    void deledeleteByFollower_MemberIdAndFollowing_MemberId(Long followerId, Long followingId);

}
