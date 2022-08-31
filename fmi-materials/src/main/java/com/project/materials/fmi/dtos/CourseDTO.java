package com.project.materials.fmi.dtos;

import com.project.materials.fmi.enums.Groups;
import com.project.materials.fmi.enums.MaterialType;

public class CourseDTO {
    private String name;
    private Groups groups;
    private MaterialType type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Groups getGroups() {
        return groups;
    }

    public void setGroups(Groups groups) {
        this.groups = groups;
    }

    public MaterialType getType() {
        return type;
    }

    public void setType(MaterialType type) {
        this.type = type;
    }
}
