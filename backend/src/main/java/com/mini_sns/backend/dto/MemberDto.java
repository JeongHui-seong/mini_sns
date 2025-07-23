package com.mini_sns.backend.dto;

import lombok.Getter;
import lombok.Setter;

// 회원가입 및 로그인
@Getter
@Setter
public class MemberDto {
  private String email;
  private String password;
}
