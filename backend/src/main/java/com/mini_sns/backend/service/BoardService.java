package com.mini_sns.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mini_sns.backend.entity.Board;
import com.mini_sns.backend.entity.Member;
import com.mini_sns.backend.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class BoardService {

    @Autowired
    private final BoardRepository boardRepository;

    // 게시글 조회
    public List<Board> getBoardList() {
        return this.boardRepository.findAll();
    }

    // 게시글 단건 조회
    public Board getBoardOne(Long boardId) {
        Optional<Board> opBoard = this.boardRepository.findById(boardId);
        if (opBoard.isPresent()) {
            return opBoard.get();
        } else {
            throw new RuntimeException("게시글이 없습니다.");
        }
    }

    // 게시글 작성
    public Board createBoard(String content, byte[] imageData, Member writer) {
        Board board = new Board();
        board.setContent(content);
        board.setImageData(imageData);
        board.setCreatedAt(LocalDateTime.now());
        if (writer != null) {
            board.setWriter(writer);
        }

        return this.boardRepository.save(board);
    }

    // 게시글 수정
    public void updateBoard(Board board, String content, String imageData) {
        board.setContent(content);
        board.setImageData(null);
        board.setUpdatedAt(LocalDateTime.now());

        this.boardRepository.save(board);
    }

    // 게시글 삭제
    public void deleteBoard(Board board) {
        this.boardRepository.delete(board);
    }

}
