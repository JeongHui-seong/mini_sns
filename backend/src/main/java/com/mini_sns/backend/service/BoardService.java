package com.mini_sns.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mini_sns.backend.dto.BoardResponseDto;
import com.mini_sns.backend.entity.Board;
import com.mini_sns.backend.entity.Member;
import com.mini_sns.backend.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class BoardService {

    private final BoardRepository boardRepository;

    // 게시글 조회
    public List<BoardResponseDto> getBoardList() {
        return boardRepository.findAll()
                .stream()
                .map(board -> new BoardResponseDto(
                        board.getBoardId(),
                        board.getContent(),
                        board.getWriter() != null ? board.getWriter().getUsername() : "알 수 없음",
                        board.getWriter() != null ? board.getWriter().getEmail() : "",
                        board.getWriter() != null ? board.getWriter().getProfileImg() : null,
                        board.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    // 게시글 단건 조회
    public Board getBoardOne(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("게시글이 없습니다."));
    }

    // 게시글 작성
    public Board createBoard(String content, byte[] imageData, Member writer) {
        Board board = Board.builder()
                .content(content)
                .imageData(imageData)
                .writer(writer)
                .build();

        return boardRepository.save(board);
    }

    // 게시글 수정
    public void updateBoard(Board board, String content, byte[] imageData) {
        board.setContent(content);
        if (imageData != null) {
            board.setImageData(imageData);
        }

        this.boardRepository.save(board);
    }

    // 게시글 삭제
    public void deleteBoard(Board board) {
        this.boardRepository.delete(board);
    }
}
