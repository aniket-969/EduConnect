package com.educonnect.educonnect.service;

import com.educonnect.educonnect.entity.*;
import com.educonnect.educonnect.*;
import com.educonnect.educonnect.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register new user
    public User registerUser(User user) {
        // Optionally: hash password before saving
        return userRepository.save(user);
    }

    // Find user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Find user by email (for login or validation)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get users by role (STUDENT or INSTRUCTOR)
    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }
}
