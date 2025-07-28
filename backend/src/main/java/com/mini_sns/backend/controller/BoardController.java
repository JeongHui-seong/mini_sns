package com.mini_sns.backend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mini_sns.backend.dto.BoardResponseDto;
import com.mini_sns.backend.entity.Board;
import com.mini_sns.backend.entity.Member;
import com.mini_sns.backend.service.BoardService;
import com.mini_sns.backend.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final MemberService memberService;

    // 게시글 조회
    @GetMapping
    public ResponseEntity<List<BoardResponseDto>> getBoardList() {
        List<BoardResponseDto> boards = boardService.getBoardList();
        return ResponseEntity.ok(boards);
    }

    // 게시글 단건 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<Board> getBoardOne(@PathVariable Long boardId) {
        Board board = boardService.getBoardOne(boardId);
        return ResponseEntity.ok(board);
    }

    // 게시글 작성
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody String content,
                                             Principal principal) {
        Member member = memberService.getMember(principal.getName());
        Board createdBoard = boardService.createBoard(content, null, member);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
    }

    // 게시글 수정
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{boardId}")
    public ResponseEntity<Board> updateBoard(@PathVariable Long boardId,
                                             @RequestBody String content,
                                             Principal principal) {
        Board board = boardService.getBoardOne(boardId);
        if (!board.getWriter().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        boardService.updateBoard(board, content, null);
        return ResponseEntity.ok(board);
    }

    // 게시글 삭제
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId, Principal principal) {
        Board board = boardService.getBoardOne(boardId);
        if (!board.getWriter().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        boardService.deleteBoard(board);
        return ResponseEntity.noContent().build();
    }
    
}
