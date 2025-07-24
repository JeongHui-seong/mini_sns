package com.mini_sns.backend.dto;

import com.mini_sns.backend.entity.Member;

import lombok.Getter;
import lombok.Setter;

// 회원가입 요청 처리
@Getter
@Setter
public class MemberDto {
  private String email;
  private String nickname;
  private String password;

  // DTO -> Entity 변환 메서드
  // Service에서 setter로 변환해도 되지만 실무에서는 Dto안에 변환메서드를 추가하고 서비스에서 깔끔하게 사용하는 경우가 많음
  public Member toEntity() {
    Member member = new Member();
    member.setEmail(this.email);
    member.setUsername(this.nickname);
    member.setPassword(this.password);
    return member;
  }
}
