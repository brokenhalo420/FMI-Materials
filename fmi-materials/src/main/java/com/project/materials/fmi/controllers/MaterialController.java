package com.project.materials.fmi.controllers;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.MaterialDTO;
import com.project.materials.fmi.repositories.services.MaterialRepositoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Api(tags="Material Controller")
@RestController
@RequestMapping("/material")
public class MaterialController {
    @Autowired
    private MaterialRepositoryService service;

    @GetMapping("/all")
    public Iterable<MaterialDTO> getAllMaterials(){
        return service.getAllMaterials();
    }

    @GetMapping("/by-name/{name:.*}")
    public Iterable<MaterialDTO> getMaterialsByName(@PathVariable String name){
        return service.getMaterialsByName(name);
    }

    @GetMapping("/by-id/{id}")
    public Optional<MaterialDTO> getMaterialById(@PathVariable long id){
        return service.getMaterial(id);
    }

    @PostMapping("/add-new-material")
    public void addMaterial(@RequestBody MaterialDTO material){
        service.addMaterial(material);
    }

    @DeleteMapping("/delete-by-name/{name=.*}")
    public void deleteMaterialByName(@PathVariable String name){
        service.deleteMaterialByName(name);
    }

    @DeleteMapping("/delete-by-id/{id}")
    public void deleteMaterialById(@PathVariable long id){
        service.deleteMaterial(id);
    }

    @GetMapping("/get-by-course/{name=.*}")
    public Iterable<MaterialDTO> getMaterialsByCourse(String name){
        return this.service.getMaterialsByCourse(name);
    }
}
