package com.example.backend.mapper;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;

public class UserMapper {

    public static UserDto toDto(User user){
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    public static User toEntity(UserDto dto){
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        return user;
    }
}
