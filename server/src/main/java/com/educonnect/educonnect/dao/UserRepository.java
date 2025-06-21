package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.entity.*;
import com.educonnect.educonnect.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (for login or duplicate check)
    Optional<User> findByEmail(String email);
    
    Optional<User> findByEmailIgnoreCase(String email);


    // Find users by role (STUDENT or INSTRUCTOR)
    List<User> findByRole(Role role);
}
