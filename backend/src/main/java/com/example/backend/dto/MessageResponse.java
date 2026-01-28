package com.example.backend.dto;

public class MessageResponse {
    String message;

    public MessageResponse(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
