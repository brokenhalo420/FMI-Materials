package com.project.materials.fmi.repositories.services;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.mappers.CourseMapper;
import com.project.materials.fmi.models.Course;
import com.project.materials.fmi.models.Material;
import com.project.materials.fmi.repositories.contracts.CourseDB;
import com.project.materials.fmi.repositories.contracts.MaterialDB;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

public class CourseRepositoryService {
    private CourseDB courseRepository;
    private MaterialDB materialRepository;

    @Autowired
    public CourseRepositoryService(CourseDB courseRepository, MaterialDB materialRepository){
        this.courseRepository = courseRepository;
        this.materialRepository = materialRepository;
    }

    public Iterable<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream().map(CourseMapper::toDTO).collect(Collectors.toList());
    }

    public Iterable<CourseDTO> getCoursesByName(String name){
        return courseRepository.findAll().stream().filter(course -> course.getName().contains(name)).map(CourseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void addCourse(CourseDTO course){
        Course entry = new Course();
        courseRepository.save(CourseMapper.fromDTO(entry,course));
    }

    public void deleteCourseByName(String name){
        Course course;
        try{
            course = courseRepository.findAll().stream().filter(x -> x.getName().equals(name)).findFirst().get();
        } catch (NoSuchElementException e){
            return;
        }

        var list = materialRepository.findAll().stream().filter(x -> x.getCourseId().getId()==course.getId()).collect(Collectors.toList());

        list.forEach(x -> materialRepository.delete(x));

        courseRepository.delete(course);
    }

    public void editCourse(CourseDTO courseToModify, String oldName){
        Course courseInDB = courseRepository.findAll().stream().filter(x -> x.getName().equals(oldName)).findFirst().get();

        if(courseInDB == null){
            return;
        }

        courseInDB.setName(courseToModify.getName());
        courseInDB.setGroup(courseToModify.getGroups());

        courseRepository.save(courseInDB);
    }

}
