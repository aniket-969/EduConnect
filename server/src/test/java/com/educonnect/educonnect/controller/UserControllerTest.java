package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private UUID userId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userId = UUID.randomUUID();
    }

    @Test
    void registerUser_ShouldReturnCreatedUser() {
        User user = new User();
        user.setId(userId);
        user.setName("Test Instructor");
        user.setRole(Role.INSTRUCTOR);

        when(userService.createUser(user)).thenReturn(user);

        ResponseEntity<User> response = userController.registerUser(user);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Test Instructor", response.getBody().getName());
    }

    @Test
    void getAllUsers_ShouldReturnUserList() {
        User user1 = new User();
        user1.setEmail("user1@example.com");

        User user2 = new User();
        user2.setEmail("user2@example.com");

        when(userService.getAllUsers()).thenReturn(List.of(user1, user2));

        List<User> result = userController.getAllUsers();
        assertEquals(2, result.size());
        assertEquals("user1@example.com", result.get(0).getEmail());
    }

    @Test
    void getUserById_ShouldReturnUser_WhenExists() {
        User user = new User();
        user.setId(userId);
        user.setName("Alice");

        when(userService.getUserById(userId)).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.getUserById(userId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Alice", response.getBody().getName());
    }

    @Test
    void getUserById_ShouldReturnNotFound_WhenDoesNotExist() {
        when(userService.getUserById(userId)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserById(userId);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void getUsersByRole_ShouldReturnUserListByRole() {
        User instructor = new User();
        instructor.setRole(Role.INSTRUCTOR);
        instructor.setName("Instructor One");

        when(userService.getUsersByRole(Role.INSTRUCTOR)).thenReturn(List.of(instructor));

        List<User> result = userController.getUsersByRole(Role.INSTRUCTOR);
        assertEquals(1, result.size());
        assertEquals("Instructor One", result.get(0).getName());
    }

    @Test
    void updateUser_ShouldReturnUpdatedUser() {
        User updatedUser = new User();
        updatedUser.setId(userId);
        updatedUser.setName("Updated Name");

        when(userService.updateUser(userId, updatedUser)).thenReturn(updatedUser);

        ResponseEntity<User> response = userController.updateUser(userId, updatedUser);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Updated Name", response.getBody().getName());
    }

    @Test
    void deleteUser_ShouldReturnNoContent() {
        doNothing().when(userService).deleteUser(userId);

        ResponseEntity<Void> response = userController.deleteUser(userId);
        assertEquals(204, response.getStatusCodeValue());
        assertNull(response.getBody());
    }
}
