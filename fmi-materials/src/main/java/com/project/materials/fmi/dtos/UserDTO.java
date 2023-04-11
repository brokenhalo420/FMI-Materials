package com.project.materials.fmi.dtos;

import com.project.materials.fmi.enums.UserType;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private UserType type;
}
