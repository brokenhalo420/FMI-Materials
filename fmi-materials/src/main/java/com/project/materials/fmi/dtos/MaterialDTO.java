package com.project.materials.fmi.dtos;

import com.project.materials.fmi.enums.Groups;
import com.project.materials.fmi.enums.MaterialType;

public class MaterialDTO {
    private String name;
    private String filePath;
    private MaterialType type;
    private Groups group;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public MaterialType getType() {
        return type;
    }

    public void setType(MaterialType type) {
        this.type = type;
    }

    public Groups getGroup() {
        return group;
    }

    public void setGroup(Groups group) {
        this.group = group;
    }
}
