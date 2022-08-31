package com.project.materials.fmi.repositories.services;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.mappers.CourseMapper;
import com.project.materials.fmi.models.Course;
import com.project.materials.fmi.repositories.contracts.CourseDB;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

public class CourseRepositoryService {
    private CourseDB repository;

    @Autowired
    public CourseRepositoryService(CourseDB repository){
        this.repository = repository;
    }

    public Iterable<CourseDTO> getAllCourses() {
        return repository.findAll().stream().map(CourseMapper::toDTO).collect(Collectors.toList());
    }

    public Iterable<CourseDTO> getCoursesByName(String name){
        return repository.findAll().stream().filter(course -> name.equals(course.getName())).map(CourseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void addCourse(CourseDTO course){
        Course entry = new Course();
        repository.save(CourseMapper.fromDTO(entry,course));
    }

    public Optional<CourseDTO> getCourse(long id){
        return repository.findById(id).map(CourseMapper::toDTO);
    }

    public void deleteCourse(long id){
        repository.deleteById(id);
    }

    public void deleteCourseByName(String name){
        Course course;
        try{
            course = repository.findAll().stream().filter(x -> x.getName().equals(name)).findFirst().get();
        } catch (NoSuchElementException e){
            return;
        }

        repository.delete(course);
    }

}
