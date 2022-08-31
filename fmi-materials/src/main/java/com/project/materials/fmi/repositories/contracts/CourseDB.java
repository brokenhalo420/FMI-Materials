package com.project.materials.fmi.repositories.contracts;

import com.project.materials.fmi.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseDB extends JpaRepository<Course,Long> {
}
