package com.project.materials.fmi.models;

import com.project.materials.fmi.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "type")
    private UserType type;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_courses",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")//, updatable = false),
            ,
            inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id")//, nullable = false, updatable = false)
    )
    private List<Course> favorites;

}
