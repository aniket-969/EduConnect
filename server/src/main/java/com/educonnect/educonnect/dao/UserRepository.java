package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Find user by email (exact match)
    Optional<User> findByEmail(String email);

    // Find user by email (case-insensitive match)
    Optional<User> findByEmailIgnoreCase(String email);

    // Find users by role
    List<User> findByRole(Role role);
}
