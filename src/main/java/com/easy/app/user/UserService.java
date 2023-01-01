package com.easy.app.user;

import com.easy.app.user.exception.BadRequestException;
import com.easy.app.user.exception.UserNotFoundException;
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
        final Boolean existByEmail = userRepository.isExistByEmail(user.getEmail());
        if (existByEmail) {
            throw new BadRequestException(String.format("User with email %s already exists", user.getEmail()));
        }
        userRepository.save(user);
    }

    void deleteUser(long userId) {
        final boolean userExist = userRepository.existsById(userId);
        if (!userExist) {
            throw new UserNotFoundException(String.format("User not found by id={%s}", userId));
        }
        userRepository.deleteById(userId);
    }
}
