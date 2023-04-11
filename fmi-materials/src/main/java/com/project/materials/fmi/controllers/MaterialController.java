package com.project.materials.fmi.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.MaterialDTO;
import com.project.materials.fmi.repositories.services.MaterialRepositoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
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

    @GetMapping("/by-name")
    public Iterable<MaterialDTO> getMaterialsByName(@RequestParam String name){
        return service.getMaterialsByName(name);
    }

    @PostMapping("/add-new-material")
    public void addMaterial(@RequestParam String courseName,@RequestBody MaterialDTO material){
        service.addMaterial(courseName, material);
    }

    @PostMapping("/add-new-material-v2")
    public ResponseEntity<MaterialDTO> addMaterialNew(@RequestBody Map<String, Object> body){
        System.out.println(body);
        MaterialDTO dto = new ObjectMapper().convertValue(body.get("material"), MaterialDTO.class);
        return ResponseEntity.ok(service.addMaterialNew(body.get("courseName").toString(), dto));
    }
//    @RequestBody String courseName, @RequestBody MaterialDTO material
    @DeleteMapping("/delete-by-name")
    public void deleteMaterialByName(@RequestParam String name){
        service.deleteMaterialByName(name);
    }

    @GetMapping("/get-by-course")
    public Iterable<MaterialDTO> getMaterialsByCourse(@RequestParam String courseName){
        return this.service.getMaterialsByCourse(courseName);
    }

    @PutMapping("/edit")
    public void editMaterial(@RequestParam String oldName, @RequestBody MaterialDTO material){
        service.editMaterial(oldName,material);
    }
}
