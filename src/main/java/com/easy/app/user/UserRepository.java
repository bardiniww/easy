package com.easy.app.user;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface UserRepository extends JpaRepository<User, Long> {
    @Query(
            "SELECT CASE WHEN COUNT(u) > 0 THEN " +
                    "TRUE ELSE FALSE END " +
                    "FROM User u " +
                    "WHERE u.email = ?1"
    )
    Boolean isExistByEmail(@NonNull final String email);
}
