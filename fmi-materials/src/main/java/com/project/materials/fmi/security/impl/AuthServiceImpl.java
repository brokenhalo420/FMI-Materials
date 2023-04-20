package com.project.materials.fmi.security.impl;


import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.mappers.UserMapper;
import com.project.materials.fmi.models.User;
import com.project.materials.fmi.repositories.services.UserRepositoryService;
import com.project.materials.fmi.security.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepositoryService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO login(String email, String password) {
        User user = userService.getRealUserByEmail(email);
        if(passwordEncoder.matches(password, user.getPassword())) {
            return UserMapper.toDTO(user);
        } else {
            throw new IllegalArgumentException("The password is incorrect");
        }
    }

}
