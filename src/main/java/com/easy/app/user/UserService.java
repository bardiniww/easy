package com.easy.app.user;

import com.easy.app.user.exception.BadRequestException;
import com.easy.app.user.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
class UserService {

    private final UserRepository userRepository;

    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    void addUser(User user) {
        final Boolean existByEmail = userRepository.isExistByEmail(user.getEmail());
        if (existByEmail) {
            log.error(String.format("User with email %s already exists. User creation canceled.", user.getEmail()));
            throw new BadRequestException(String.format("User with email %s already exists", user.getEmail()));
        }
        userRepository.save(user);
    }

    void deleteUser(long userId) {
        final boolean userExist = userRepository.existsById(userId);
        if (!userExist) {
            log.error(String.format("User not found by id={%s}. User deletion unavailable.", userId));
            throw new UserNotFoundException(String.format("User not found by id={%s}", userId));
        }
        userRepository.deleteById(userId);
    }
}
