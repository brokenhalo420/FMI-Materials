package com.project.materials.fmi.models;

import com.project.materials.fmi.enums.Groups;
import com.project.materials.fmi.enums.MaterialType;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name="courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="groupType")
    private Groups group;

    @Column(name="materialType")
    private MaterialType materialType;

    @ManyToMany(mappedBy = "favorites", fetch = FetchType.LAZY)
    private List<User> favorited;

    @OneToMany(mappedBy = "courseId", fetch=FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Material> materials;
}
