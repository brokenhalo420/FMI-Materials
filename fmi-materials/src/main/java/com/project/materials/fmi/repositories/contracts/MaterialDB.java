package com.project.materials.fmi.repositories.contracts;

import com.project.materials.fmi.models.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialDB extends JpaRepository<Material,Long> {
}
