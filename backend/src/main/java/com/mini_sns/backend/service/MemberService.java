package com.mini_sns.backend.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mini_sns.backend.dto.MemberDto;
import com.mini_sns.backend.entity.Member;
import com.mini_sns.backend.repository.MemberRepository;

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

    // 비밀번호 암호화
    String encryptedPassword = passwordEncoder.encode(dto.getPassword());
    dto.setPassword(encryptedPassword);

    // 엔티티 생성 및 저장 (위에서 암호화된 비밀번호를 포함한 엔티티 생성)
    Member member = dto.toEntity();
    memberRepository.save(member); // 저장
  }

  public boolean emailExists(String email) {
    System.out.println("[DEBUG] emailExists() 호출됨, email = " + email);
    return memberRepository.existsByEmail(email);
  }
}
