package com.mini_sns.backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @GeneratedValue(strategy = GeneratedType.SEQUENCE) 이건 오라클 문법
    private Long memberId; // 자바에서는 주로 카멜 표기법 사용 (첫글자는 대문자, 맨 앞 글자는 소문자)

    @Column(length = 50, nullable = false)
    private String username;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String password;

    @Lob // 대용량 바이너리 처리 (Large Object)
    // 역할 - 이미지, 동영상, 문서 같은 큰 데이터를 BLOB(Binary Large Object) 또는 CLOB(Character Large
    // Object)으로 매핑
    // DB 타입 LONGBLOB로 수정하기
    private byte[] profileImg;

    @Column(length = 300)
    private String bio;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
