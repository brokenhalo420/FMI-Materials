package com.project.materials.fmi.security;

import com.project.materials.fmi.dtos.UserDTO;

public interface AuthService {
    UserDTO login(String username, String password);
}
