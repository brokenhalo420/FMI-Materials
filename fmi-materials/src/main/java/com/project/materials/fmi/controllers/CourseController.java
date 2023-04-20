package com.project.materials.fmi.controllers;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.repositories.services.CourseRepositoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Api(tags="Course Controller")
@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseRepositoryService service;

    @GetMapping("/all")
    public Iterable<CourseDTO> getAllCourses() {
        return service.getAllCourses();
    }

    @GetMapping("/search")
    public Iterable<CourseDTO> getCoursesByName(@RequestParam String phrase){
        return service.getCoursesByName(phrase);
    }

    @PostMapping("/new-course")
    public void addCourse(@RequestBody CourseDTO course){
        service.addCourse(course);
    }

    @DeleteMapping("/delete-by-name")
    public void deleteCourseByName(@RequestParam String name){
        service.deleteCourseByName(name);
    }

    @PutMapping("/edit")
    public void editCourse(@RequestParam String oldName, @RequestBody CourseDTO course){
        service.editCourse(course,oldName);
    }
}
