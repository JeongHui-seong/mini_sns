package com.mini_sns.backend.service;

import org.springframework.stereotype.Service;

import com.mini_sns.backend.dto.MemberDto;
import com.mini_sns.backend.entity.Member;
import com.mini_sns.backend.repository.MemberRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  public void join(MemberDto dto) {
    // 이메일 중복 체크
    if (memberRepository.existsByEmail(dto.getEmail())) {
      throw new IllegalArgumentException("이미 사용 중인 이메일 입니다.");
    }

    // 엔티티 생성 및 저장
    Member member = dto.toEntity();
    memberRepository.save(member);

    String encryptedPassword = passwordEncoder.encode(dto.getPassword());
    dto.setPassword(encryptedPassword);

    memberRepository.save(member);
  }
}
