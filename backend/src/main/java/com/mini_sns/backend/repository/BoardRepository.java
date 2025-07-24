package com.mini_sns.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mini_sns.backend.entity.Board;
import com.mini_sns.backend.entity.Member;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByWriter(Member writer);

    @Query("SELECT b FROM Board b " +
           " WHERE b.writer.memberId" + 
           "    IN (" +
           "SELECT f.following.memberId FROM Follow f" + 
           " WHERE f.follower.memberId = :memberId)")
    List<Board> findBoardsOfFollowing(@Param("memberId") Long memberId);

    List<Board> findByCreatedAt(LocalDateTime dateTime);

}
