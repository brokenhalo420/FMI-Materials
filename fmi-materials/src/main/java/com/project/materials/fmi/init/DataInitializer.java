package com.project.materials.fmi.init;

import com.project.materials.fmi.enums.Groups;
import com.project.materials.fmi.enums.MaterialType;
import com.project.materials.fmi.enums.UserType;
import com.project.materials.fmi.mappers.CourseMapper;
import com.project.materials.fmi.mappers.MaterialMapper;
import com.project.materials.fmi.models.Course;
import com.project.materials.fmi.models.Material;
import com.project.materials.fmi.models.User;
import com.project.materials.fmi.repositories.contracts.CourseDB;
import com.project.materials.fmi.repositories.services.CourseRepositoryService;
import com.project.materials.fmi.repositories.services.MaterialRepositoryService;
import com.project.materials.fmi.repositories.services.UserRepositoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class DataInitializer implements ApplicationRunner {
    private final UserRepositoryService userService;
    private final MaterialRepositoryService materialService;
    private final CourseRepositoryService courseService;
    private final CourseDB courseDB;


    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userService.getAllUsers().isEmpty()) {
            User user = new User();
            user.setName("Georgi");
            user.setPassword("pw1");
            user.setType(UserType.Admin);
            user.setEmail("email.com");
            userService.addUser(user);
        }

        if (courseService.getAllCourses().isEmpty()) {
            Course course = new Course();
            course.setMaterialType(MaterialType.Pdf);
            course.setName("new course");
            course.setGroup(Groups.Mathematics);
            courseService.addCourse(CourseMapper.toDTO(course));
        }
        if (materialService.getAllMaterials().isEmpty()) {
            Course course = courseDB.findById(1L).orElseThrow(() -> new EntityNotFoundException());
            Material material = new Material();
            material.setCourseId(course);
            material.setGroup(Groups.Mathematics);
            material.setType(MaterialType.Word);
            material.setName("material 1");
            material.setFilePath("/some/file/path");
            materialService.addMaterialNew(course.getId(), MaterialMapper.toDTO(material));
        }
    }
}
