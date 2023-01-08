package com.easy.app.user;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfUserExistsByEmail() {
        // given
        String userEmail = "test@email";
        User user = new User("Login", userEmail, UserType.COMMON);
        underTest.save(user);

        // when
        Boolean expected = underTest.isExistByEmail(userEmail);

        // then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldCheckIfUserDoesNotExistByEmail() {
        // given
        String userEmail = "test@email";

        // when
        Boolean expected = underTest.isExistByEmail(userEmail);

        // then
        assertThat(expected).isFalse();
    }
}