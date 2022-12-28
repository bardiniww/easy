package com.easy.app.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
class UserService {

    private final UserRepository userRepository;

    List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
