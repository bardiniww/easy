package com.easy.app.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank
    @Column(nullable = false, unique = true)
    private String login;
    @Email
    @Column(nullable = false, unique = true)
    private String email;
    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType type;

    public User(String login, String email, UserType type) {
        this.login = login;
        this.email = email;
        this.type = type;
    }
}
