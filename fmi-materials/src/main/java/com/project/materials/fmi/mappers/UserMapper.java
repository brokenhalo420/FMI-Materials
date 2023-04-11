package com.project.materials.fmi.mappers;

import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.models.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        if(user == null){
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setType(user.getType());

        return dto;
    }

    public static User fromDTO(UserDTO dto){
        if(dto == null){
            return null;
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setType(dto.getType());

        return user;
    }
}
