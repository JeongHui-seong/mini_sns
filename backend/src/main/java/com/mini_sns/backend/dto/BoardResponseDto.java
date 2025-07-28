package com.mini_sns.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponseDto {
    private Long boardId;
    private String content;
    private String username;
    private String email;
    private byte[] profileImg;
    private LocalDateTime createdAt;
}
