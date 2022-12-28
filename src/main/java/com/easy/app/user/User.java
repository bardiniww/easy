package com.easy.app.user;

import jakarta.persistence.*;
import lombok.*;

//todo сделать абстракцию с имплементациями/либо словарь с типами
@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public final class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    private String login;
    private String email;
    @Enumerated(EnumType.STRING)
    private UserType type;

    public User(String login, String email, UserType type) {
        this.login = login;
        this.email = email;
        this.type = type;
    }
}
