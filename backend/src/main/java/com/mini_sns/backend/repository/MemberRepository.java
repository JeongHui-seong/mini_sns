package com.mini_sns.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mini_sns.backend.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
  boolean existsByEmail(String email); // 이메일 중복체크
  Optional<Member> findByEmail(String email); // 이메일로 회원 조회
}
