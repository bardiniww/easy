package com.easy.app.user;

import com.easy.app.user.exception.BadRequestException;
import com.easy.app.user.exception.UserNotFoundException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private UserService underTest;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        underTest = new UserService(userRepository);
    }

    @Test
    void canGetAllUsers() {
        // when
        underTest.getAllUsers();
        // then
        verify(userRepository).findAll();
    }

    @Test
    void canAddUser() {
        // given
        User user = new User("Login", "test@email", UserType.COMMON);

        // when
        underTest.addUser(user);

        // then
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userArgumentCaptor.capture());

        User capturedUser = userArgumentCaptor.getValue();

        Assertions.assertThat(capturedUser).isEqualTo(user);
    }

    @Test
    void willThrowWhenAddUserWithTakenEmail() {
        // given
        String email = "test@email";
        User user = new User("Login", email, UserType.COMMON);

        given(userRepository.isExistByEmail(email)).willReturn(true);

        // when
        // then
        Assertions.assertThatThrownBy(() -> underTest.addUser(user))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining(String.format("User with email %s already exists", user.getEmail()));

        verify(userRepository, never()).save(any());
    }

    @Test
    void canDeleteUser() {
        // given
        long userId = 1L;

        given(userRepository.existsById(userId)).willReturn(true);

        // when
        underTest.deleteUser(userId);

        // then
        ArgumentCaptor<Long> IDArgumentCaptor = ArgumentCaptor.forClass(Long.class);

        verify(userRepository).deleteById(IDArgumentCaptor.capture());

        Long capturedID = IDArgumentCaptor.getValue();

        Assertions.assertThat(capturedID).isEqualTo(userId);
    }

    @Test
    void willThrowWhenDeleteUserWhichNotExist() {
        // given
        long userId = 1L;

        given(userRepository.existsById(userId)).willReturn(false);

        // when
        // then
        Assertions.assertThatThrownBy(() -> underTest.deleteUser(userId))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining(String.format("User not found by id={%s}", userId));

        verify(userRepository, never()).deleteById(any());
    }
}