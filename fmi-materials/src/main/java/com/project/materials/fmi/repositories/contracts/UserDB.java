package com.project.materials.fmi.repositories.contracts;

import com.project.materials.fmi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDB extends JpaRepository<User, Long> {
}
