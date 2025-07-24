package com.mini_sns.backend.controller;

import java.lang.reflect.Member;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mini_sns.backend.entity.Board;
import com.mini_sns.backend.service.BoardService;
import com.mini_sns.backend.service.MemberService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    @Autowired
    private final BoardService boardService;

    @Autowired
    private final MemberService memberService;

    // 게시글 조회
    @GetMapping
    public List<Board> getAllBoards() {
        return boardService.getBoardList();
    }

    @GetMapping("/{id}")
    public Board getBoardById(@PathVariable Long id) {
        return boardService.getBoardOne(id);
    }

    // 게시글 작성
    @PostMapping
    public Board createBoard(@RequestParam String content,
                             @RequestParam(required = false) byte[] imageData) {
                            //  Principal principal) {
        return boardService.createBoard(content, imageData, null);
    }
    
}
