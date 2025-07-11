package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // READ: Get all users — available to both roles
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // READ: Get user by ID — available to both roles
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable("id") UUID id        // ← value = "id" is mandatory if no -parameters
    ) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // READ: Get users by role — available to both roles
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return userService.getUsersByRole(Role.valueOf(role.toUpperCase()));
    }

    // UPDATE: Change everything *except* avatar.
    // Instructors can update anyone; students can update only their own.
    @PreAuthorize("hasRole('INSTRUCTOR') or #id.toString() == authentication.principal.username")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable UUID id,
            @RequestBody User updatedUser
    ) {
        User u = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(u);
    }

    // PATCH: Update only the avatarUrl via file upload.
    @PreAuthorize("hasAnyRole('INSTRUCTOR','STUDENT')")
    @PatchMapping(
            value    = "/{id}/avatar",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<User> updateAvatar(
            @PathVariable("id") UUID id,            // ← explicitly name it here
            @RequestParam("avatar") MultipartFile avatarFile
    ) throws IOException {
        User u = userService.updateAvatar(id, avatarFile);
        return ResponseEntity.ok(u);
    }

    // DELETE: Only instructors may delete users
    @PreAuthorize("hasRole('INSTRUCTOR','STUDENT')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
