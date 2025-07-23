package com.mini_sns.backend.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class LikeId implements Serializable {

    private Long memberId;
    private Long boardId;

}
