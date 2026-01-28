package com.example.backend.controller;

import com.example.backend.dto.MessageResponse;
import com.example.backend.service.HelloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    private final HelloService helloService;

    public HelloController(HelloService helloService){
        this.helloService = helloService;
    }

    @GetMapping("/api/hello")
    public MessageResponse hello() {
        return helloService.getMessage();
    }

    @GetMapping("/api/status")
    public MessageResponse status(){
        return new MessageResponse("Backend is Healthy.");
    }

}
