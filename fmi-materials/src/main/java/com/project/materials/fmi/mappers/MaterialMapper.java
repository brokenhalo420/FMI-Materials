package com.project.materials.fmi.mappers;


import com.project.materials.fmi.dtos.MaterialDTO;
import com.project.materials.fmi.models.Material;

public class MaterialMapper {
    public static MaterialDTO toDTO(Material material) {
        if(material == null){
            return null;
        }

        MaterialDTO dto = new MaterialDTO();
        dto.setName(material.getName());
        dto.setFilePath(material.getFilePath());
        dto.setGroup(material.getGroup());
        dto.setType(material.getType());
        return dto;
    }

    public static Material fromDTO(Material material, MaterialDTO dto){
        if(material == null){
            return null;
        }
        if(dto == null){
            return null;
        }
        material.setGroup(dto.getGroup());
        material.setName(dto.getName());
        material.setType(dto.getType());
        material.setFilePath(dto.getFilePath());
        return material;
    }
}
