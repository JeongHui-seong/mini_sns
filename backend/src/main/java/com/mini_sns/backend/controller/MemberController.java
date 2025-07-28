package com.mini_sns.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mini_sns.backend.dto.MemberDto;
import com.mini_sns.backend.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
  private final MemberService memberService;

  @PostMapping("/join")
  private ResponseEntity<String> join(@RequestBody MemberDto dto) {
    memberService.join(dto);
    return ResponseEntity.ok("회원가입이 완료되었습니다.");
  }

  @GetMapping("/check")
  public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
    boolean exists = memberService.emailExists(email);
    return ResponseEntity.ok(exists);
  }
  
  @GetMapping("/me")
  public ResponseEntity<MemberDto> getCurrentMember() {
    MemberDto memberDto = memberService.getCurrentMember();
    return ResponseEntity.ok(memberDto);
  }
  

}
