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

    public void addMaterial(String courseName, MaterialDTO material){
        Material entry = new Material();
        Course queryCourse = courseRepository.findAll().stream().filter(x -> x.getName().equals(courseName))
        .findFirst().get();
        MaterialMapper.fromDTO(entry,material);
        entry.setCourseId(queryCourse);
        materialRepository.save(entry);
        queryCourse.getMaterials().add(entry);
        courseRepository.save(queryCourse);
    }

    public void deleteMaterialByName(String name){
        Material material;
        try{
            material = materialRepository.findAll().stream().filter(x -> x.getName().equals(name)).findFirst().get();
        } catch (NoSuchElementException e){
            return;
        }
        Course course = material.getCourseId();
        course.getMaterials().remove(material);
        materialRepository.delete(material);
        courseRepository.save(course);
    }

    public Iterable<MaterialDTO> getMaterialsByCourse(String courseName){
        Course queryCourse = this.courseRepository.findAll().stream().filter(x -> courseName.equals(x.getName())).findFirst().get();

        if(queryCourse == null){
            return new ArrayList<MaterialDTO>();
        }

        return queryCourse.getMaterials().stream().map(MaterialMapper::toDTO).collect(Collectors.toList());
    }

    public void editMaterial(String name, MaterialDTO material){
        Material materialInDB = this.materialRepository.findAll().stream().filter(x -> x.getName().equals(name)).findFirst().get();

        materialInDB.setName(material.getName());
        materialInDB.setType(material.getType());
        materialInDB.setGroup(material.getGroup());
        materialInDB.setFilePath(material.getFilePath());

        this.materialRepository.save(materialInDB);
    }

}
