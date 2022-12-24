package com.easy.app.user;

import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public final class User {
    private long id;
    private String name;
}
