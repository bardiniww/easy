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

    void addUser(User user) {
        //todo impl validation
        userRepository.save(user);
    }

    void deleteUser(long userId) {
        //todo check if user exist
        userRepository.deleteById(userId);
    }
}
