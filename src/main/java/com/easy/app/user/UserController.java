package com.easy.app.user;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
@AllArgsConstructor
@Slf4j
class UserController {

    @GetMapping
    List<User> getAllUsers() {
        log.info("getAllUsers request passed");
        return List.of(
                new User(
                        1,
                        "Vasya",
                        "vasya@mail"
                ),
                new User(
                        2,
                        "Sanya",
                        "sanya@mail"
                )
        );
    }
}
