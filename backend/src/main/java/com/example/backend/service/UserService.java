package com.example.backend.service;

import java.util.*;
import com.example.backend.dto.UserDto;
import com.example.backend.exception.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {

    private final Map<Long, UserDto> users = new HashMap<>();
    private long nextId = 1;

    public List<UserDto> getAllUsers(){
        return new ArrayList<>(users.values());
    }

    public UserDto getUserById(Long id){
        UserDto user = users.get(id);
        if(user == null){
            throw new UserNotFoundException(id);
        }
        return user;
    }

    public UserDto createUser(UserDto user){
        user.setId(nextId++);
        users.put(user.getId(), user);
        return user;
    }

    public UserDto updateUser(Long id, UserDto user){
        if(!users.containsKey(id)){
            throw new UserNotFoundException(id);
        }
        user.setId(id);
        users.put(id, user);
        return user;
    }

    public void deleteUser(Long id){
        if(!users.containsKey(id)){
            throw new UserNotFoundException(id);
        }
        users.remove(id);
    }
}
