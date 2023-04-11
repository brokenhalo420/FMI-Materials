package com.project.materials.fmi.dtos;

import com.project.materials.fmi.enums.Groups;
import com.project.materials.fmi.enums.MaterialType;
import lombok.Data;

@Data
public class CourseDTO {
    private String name;
    private Groups groups;
}
