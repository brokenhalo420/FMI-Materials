package com.project.materials.fmi.models;

import com.project.materials.fmi.enums.Groups;
import com.project.materials.fmi.enums.MaterialType;
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
import java.util.Set;

@Entity
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

    @ManyToMany(mappedBy = "favorites", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<User> favorited;

    @OneToMany(mappedBy = "courseId", fetch=FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Material> materials;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Groups getGroup() {
        return group;
    }

    public void setGroup(Groups group) {
        this.group = group;
    }

    public MaterialType getMaterialType() {
        return materialType;
    }

    public void setMaterialType(MaterialType materialType) {
        this.materialType = materialType;
    }

    public Set<User> getFavorited() {
        return favorited;
    }

    public void setFavorited(Set<User> favorited) {
        this.favorited = favorited;
    }

    public Set<Material> getMaterials() {
        return materials;
    }

    public void setMaterials(Set<Material> materials) {
        this.materials = materials;
    }
}
