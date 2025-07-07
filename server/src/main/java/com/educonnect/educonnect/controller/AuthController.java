package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.dto.AuthRequest;
import com.educonnect.educonnect.dto.AuthResponse;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.security.JwtUtil;
import com.educonnect.educonnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private UserService userService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest request) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );


        User user = userService.getUserByEmail(request.getEmail())
                .orElseThrow();

        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(
                new AuthResponse(token, "Logged in successfully")
        );
    }

    // 2) REGISTER (anonymous)
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody User incoming) {

        incoming.setPassword(
                passwordEncoder.encode(incoming.getPassword())
        );

        User saved = userService.createUser(incoming);

        String token = jwtUtil.generateToken(saved);

        return ResponseEntity.ok(
                new AuthResponse(token, "Registered successfully")
        );
    }
}
