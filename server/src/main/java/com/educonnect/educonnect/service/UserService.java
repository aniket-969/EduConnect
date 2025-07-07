package com.educonnect.educonnect.service;
import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create user (Register)
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Get user by ID
    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get users by role
    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    // Update user (Instructor only)
    public User updateUser(UUID id, User updatedUser) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setAvatarUrl(updatedUser.getAvatarUrl());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setBio(updatedUser.getBio());
            // Optionally: Don't allow role change directly here
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    // Delete user (Instructor only)
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
