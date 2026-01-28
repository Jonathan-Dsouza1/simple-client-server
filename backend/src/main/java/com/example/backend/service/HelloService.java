package com.example.backend.service;

import com.example.backend.dto.MessageResponse;
import org.springframework.stereotype.Service;

@Service
public class HelloService {
    public MessageResponse getMessage() {
        return new MessageResponse("Hello JSON from Spring Boot.");
    }
}
