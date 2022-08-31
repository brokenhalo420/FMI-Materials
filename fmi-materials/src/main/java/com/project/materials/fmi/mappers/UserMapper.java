package com.project.materials.fmi.mappers;

import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.models.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        if(user == null){
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setType(user.getType());
        return dto;
    }

    public static User fromDTO(User user, UserDTO dto){
        if(user == null){
            return null;
        }
        if(dto == null){
            return null;
        }
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setPassword(dto.getPassword());
        user.setType(dto.getType());
        return user;
    }
}
