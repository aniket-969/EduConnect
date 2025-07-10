package com.educonnect.educonnect.service;

import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

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


    public User updateUser(UUID id, User updatedUser) {
        return userRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedUser.getName());
                    existing.setEmail(updatedUser.getEmail());
                    existing.setPassword(updatedUser.getPassword());
                    existing.setBio(updatedUser.getBio());
                    // avatarUrl is not changed here
                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }


    public User updateAvatar(UUID id, MultipartFile file) throws IOException {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        String url = cloudinaryService.uploadAvatar(file);

        existing.setAvatarUrl(url);
        return userRepository.save(existing);
    }

    // Delete user (Instructor only)
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
