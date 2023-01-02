package com.easy.app.user;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
@AllArgsConstructor
@Slf4j
class UserController {

    private final UserService userService;

    @GetMapping
    List<User> getAllUsers() {
        log.info("getAllUsers request passed");
        return userService.getAllUsers();
    }

    @PostMapping
    void addUser(@Valid @RequestBody final User user) {
        log.info("addUser request passed");
        userService.addUser(user);
    }

    @DeleteMapping(path = "{userId}")
    void deleteUser(@PathVariable("userId") long userId) {
        log.info("deleteUser request passed");
        userService.deleteUser(userId);
    }
}
