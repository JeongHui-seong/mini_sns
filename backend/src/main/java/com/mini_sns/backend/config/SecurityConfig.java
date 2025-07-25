package com.mini_sns.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
  // 비밀번호 암호화
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // HTTP 보안 설정
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { // HTTP 요청에 대한 보안 규칙을 직접 정의해주는 메서드
    http
        .csrf(csrf -> csrf.disable()) // CSRF 비활성화 (CSRF는 사이트간 요청 위조 방지. 프론트랑 백을 분리해서 쓰고 있으면 오히려 불필요하고 오류날 수도 있어서 꺼줌!)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(
                "/member/join",
                "/member/check")
            .permitAll() // 회원가입/이메일중복확인은 인증 없이 허용
            .anyRequest().authenticated() // 그 외 요청은 인증 필요
        )
        .formLogin(form -> form.disable()); // Spring Security가 띄우는 기본 로그인 폼 사용 안 함 (REST API 방식이니까 필요없음)
    return http.build();
  }
}
