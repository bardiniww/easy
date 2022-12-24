package com.easy.app.user;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
@AllArgsConstructor
class UserController {

    @GetMapping
    List<User> getAllUsers() {
        return List.of(new User(
                1,
                "Vasya"
        ));
    }
}
