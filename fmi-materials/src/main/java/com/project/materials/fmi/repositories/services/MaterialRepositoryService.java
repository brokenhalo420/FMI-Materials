package com.project.materials.fmi.repositories.services;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.MaterialDTO;
import com.project.materials.fmi.mappers.MaterialMapper;
import com.project.materials.fmi.models.Course;
import com.project.materials.fmi.models.Material;
import com.project.materials.fmi.repositories.contracts.CourseDB;
import com.project.materials.fmi.repositories.contracts.MaterialDB;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

public class MaterialRepositoryService {
    private MaterialDB materialRepository;
    private CourseDB courseRepository;

    @Autowired
    public MaterialRepositoryService(MaterialDB materialRepository, CourseDB courseRepository){
        this.materialRepository = materialRepository;
        this.courseRepository = courseRepository;
    }

    public Iterable<MaterialDTO> getAllMaterials() {
        return materialRepository.findAll().stream().map(MaterialMapper::toDTO).collect(Collectors.toList());
    }

    public Iterable<MaterialDTO> getMaterialsByName(String name){
        return materialRepository.findAll().stream().filter(material -> name.equals(material.getName()))
                .map(MaterialMapper::toDTO).collect(Collectors.toList());
    }

    public void addMaterial(MaterialDTO material){
        Material entry = new Material();
        materialRepository.save(MaterialMapper.fromDTO(entry,material));
    }

    public Optional<MaterialDTO> getMaterial(long id){
        return materialRepository.findById(id).map(MaterialMapper::toDTO);
    }

    public void deleteMaterial(long id){
        materialRepository.deleteById(id);
    }

    public void deleteMaterialByName(String name){
        Material material;
        try{
            material = materialRepository.findAll().stream().filter(x -> x.getName().equals(name)).findFirst().get();
        } catch (NoSuchElementException e){
            return;
        }

        materialRepository.delete(material);
    }

    public Iterable<MaterialDTO> getMaterialsByCourse(String name){
        Course queryCourse = this.courseRepository.findAll().stream().filter(x -> name.equals(x.getName())).findFirst().get();

        if(queryCourse == null){
            return new ArrayList<MaterialDTO>();
        }

        return this.materialRepository.findAll().stream().filter(x -> x.getCourseId().equals(queryCourse.getId())).map(MaterialMapper::toDTO).collect(Collectors.toList());
    }

}
