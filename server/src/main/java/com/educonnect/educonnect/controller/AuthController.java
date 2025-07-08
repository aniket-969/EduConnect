package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.dto.AuthRequest;
import com.educonnect.educonnect.dto.AuthResponse;
import com.educonnect.educonnect.dto.RegistrationRequest;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.security.JwtUtil;
import com.educonnect.educonnect.service.CloudinaryService;
import com.educonnect.educonnect.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private UserService userService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private CloudinaryService cloudinaryService;
//    Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest request) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userService
                .getUserByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(
                new AuthResponse(token, "Logged in successfully")
        );
    }

    //    Register
    @PostMapping(
            value    = "/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<AuthResponse> register(
            @Valid @ModelAttribute RegistrationRequest incoming,
            @RequestParam(value = "avatarUrl", required = false) MultipartFile avatarFile
    ) throws IOException {
        User u = new User();
        u.setName(incoming.getName());
        u.setEmail(incoming.getEmail());
        u.setPassword(passwordEncoder.encode(incoming.getPassword()));
        u.setRole(incoming.getRole());
        u.setBio(incoming.getBio());

        // only upload if a file was sent
        if (avatarFile != null && !avatarFile.isEmpty()) {
            String url = cloudinaryService.uploadAvatar(avatarFile);
            u.setAvatarUrl(url);
        }

        User saved = userService.createUser(u);
        String token = jwtUtil.generateToken(saved);
        return ResponseEntity.ok(new AuthResponse(token, "Registered successfully"));
    }

}
