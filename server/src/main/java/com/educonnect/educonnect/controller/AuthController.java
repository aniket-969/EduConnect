package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.dto.AuthRequest;
import com.educonnect.educonnect.dto.AuthResponse;
import com.educonnect.educonnect.dto.RegistrationRequest;
import com.educonnect.educonnect.dto.UserDTO;             // ← import
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.security.JwtUtil;
import com.educonnect.educonnect.service.CloudinaryService;
import com.educonnect.educonnect.service.UserService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CloudinaryService cloudinaryService;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        // 1. Authenticate credentials
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 2. Load the user from DB
        User user = userService
                .getUserByEmail(request.getEmail())
                .orElseThrow(/* your exception */);

        // 3. Generate JWT
        String token = jwtUtil.generateToken(user);

        // 4. Build UserDTO
        UserDTO dto = UserDTO.fromEntity(user);

        // 5. Return token + user details + message
        return ResponseEntity.ok(
                new AuthResponse(token, dto, "Logged in successfully")
        );
    }

    // --------------------------------------------------
    // REGISTER
    // --------------------------------------------------
    @PostMapping(
            value    = "/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<AuthResponse> register(
            @Valid @ModelAttribute RegistrationRequest incoming,
            @RequestParam(value = "avatarUrl", required = false)
            MultipartFile avatarFile
    ) throws IOException {
        // 1. Map incoming DTO to entity
        User u = new User();
        u.setName(incoming.getName());
        u.setEmail(incoming.getEmail());
        u.setPassword(passwordEncoder.encode(incoming.getPassword()));
        u.setRole(incoming.getRole());
        u.setBio(incoming.getBio());

        // 2. Optional avatar upload
        if (avatarFile != null && !avatarFile.isEmpty()) {
            String url = cloudinaryService.uploadAvatar(avatarFile);
            u.setAvatarUrl(url);
        }

        // 3. Save user & generate token
        User saved = userService.createUser(u);
        String token = jwtUtil.generateToken(saved);

        // 4. Build UserDTO
        UserDTO dto = UserDTO.fromEntity(saved);

        // 5. Return token + user details + message
        return ResponseEntity.ok(
                new AuthResponse(token, dto, "Registered successfully")
        );
    }
}
