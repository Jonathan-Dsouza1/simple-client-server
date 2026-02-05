package com.example.backend.service;

import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.RegisterRequest;
import com.example.backend.entity.AuthUser;
import com.example.backend.repository.AuthUserRepository;
import com.example.backend.utility.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(AuthUserRepository authUserRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil){
        this.authUserRepository = authUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterRequest req){
        AuthUser user = new AuthUser();
        user.setName((req.name));
        user.setEmail(req.email);
        user.setPassword(passwordEncoder.encode(req.password));
        authUserRepository.save(user);
    }

    public AuthResponse login(LoginRequest req) {
        AuthUser user = authUserRepository.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));

        if(!passwordEncoder.matches(req.password, user.getPassword())){
            throw new RuntimeException("Invalid Credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
