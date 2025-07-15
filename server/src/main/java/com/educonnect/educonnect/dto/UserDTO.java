package com.educonnect.educonnect.dto;

import java.util.UUID;
import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.entity.User;

public class UserDTO {
    private UUID   id;
    private String name;
    private String email;
    private Role   role;
    private String avatarUrl;
    private String bio;

    // No-arg constructor
    public UserDTO() {}

    // Getters
    public UUID getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public Role getRole() {
        return role;
    }
    public String getAvatarUrl() {
        return avatarUrl;
    }
    public String getBio() {
        return bio;
    }

    // Setters
    public void setId(UUID id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }

    // Mapper from User entity
    public static UserDTO fromEntity(User u) {
        UserDTO dto = new UserDTO();
        dto.setId(u.getId());
        dto.setName(u.getName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole());
        dto.setAvatarUrl(u.getAvatarUrl());
        dto.setBio(u.getBio());
        return dto;
    }
}
