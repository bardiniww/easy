package com.easy.app.user;

import org.springframework.data.jpa.repository.JpaRepository;

//@Repository
interface UserRepository extends JpaRepository<User, Long> {
}
