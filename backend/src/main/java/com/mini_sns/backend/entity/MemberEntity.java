package com.mini_sns.backend.entity;

import java.security.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MemberEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long member_Id;

  @Column(length = 50, nullable = false)
  private String username;

  @Column(length = 100, nullable = false, unique = true)
  private String email;

  @Column(nullable = true)
  private String password;

  @Lob // 대용량 바이너리 처리 // DB 타입 LONGBLOB로 수정하기
  private byte[] profile_img;

  @Column(length = 300)
  private String bio;

  private Timestamp create_at;
}
