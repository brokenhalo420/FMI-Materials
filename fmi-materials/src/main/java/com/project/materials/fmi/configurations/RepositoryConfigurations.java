package com.project.materials.fmi.configurations;

import com.project.materials.fmi.repositories.contracts.CourseDB;
import com.project.materials.fmi.repositories.contracts.MaterialDB;
import com.project.materials.fmi.repositories.contracts.UserDB;
import com.project.materials.fmi.repositories.services.CourseRepositoryService;
import com.project.materials.fmi.repositories.services.MaterialRepositoryService;
import com.project.materials.fmi.repositories.services.UserRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RepositoryConfigurations {

    @Bean
    @Autowired
    public UserRepositoryService getUserService(UserDB db){
        return new UserRepositoryService(db);
    }

    @Bean
    @Autowired
    public MaterialRepositoryService getMaterialService(MaterialDB db, CourseDB crsDb){
        return new MaterialRepositoryService(db, crsDb);
    }

    @Bean
    @Autowired
    public CourseRepositoryService getCourseMaterial(CourseDB db){
        return new CourseRepositoryService(db);
    }
}
