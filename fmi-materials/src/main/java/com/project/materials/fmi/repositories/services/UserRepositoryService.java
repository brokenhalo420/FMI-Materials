package com.project.materials.fmi.repositories.services;
import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.mappers.CourseMapper;
import com.project.materials.fmi.mappers.UserMapper;
import com.project.materials.fmi.models.User;
import com.project.materials.fmi.repositories.contracts.CourseDB;
import com.project.materials.fmi.repositories.contracts.UserDB;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

public class UserRepositoryService {
    private UserDB userRepository;
    private CourseDB courseRepository;
    
    @Autowired
    public UserRepositoryService(UserDB userRepository, CourseDB courseRepository){
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public Iterable<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    public Iterable<UserDTO> getUsersByName(String name){
        return userRepository.findAll().stream().filter(user -> name.equals(user.getName()))
                .map(UserMapper::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserByEmail(String email){
        return userRepository.findAll().stream().filter(x -> email.equals(x.getEmail())).map(UserMapper::toDTO).findFirst().get();
    }

    public Optional<UserDTO> getUser(String email, String password){
        return userRepository.findAll().stream()
                .filter(user -> email.equals(user.getEmail()) && password.equals(user.getPassword()))
                .map(UserMapper::toDTO).findFirst();
    }

    public void addUser(UserDTO user){
        User entry = new User();
        userRepository.save(UserMapper.fromDTO(entry,user));
    }

    public void deleteUser(String email, String password){
        User user;
        try{
            user = userRepository.findAll().stream()
                    .filter(x -> email.equals(x.getEmail()) && password.equals(x.getPassword()))
                    .findFirst().get();
        } catch (NoSuchElementException e){
            return;
        }
        userRepository.delete(user);
    }

    public Iterable<CourseDTO> getFavorites(String email){
        return this.userRepository.findAll().stream().filter(x-> x.getEmail().equals(email)).findFirst().get().getFavorites()
                .stream().map(CourseMapper::toDTO).collect(Collectors.toList());
    }

    public void addToFavorites(String email, String courseName){
        try {
            var user = this.userRepository.findAll().stream().filter(x -> x.getEmail().equals(email)).findFirst().get();
            var course = this.courseRepository.findAll().stream().filter(x -> x.getName().equals(courseName))
                    .findFirst().get();

            user.getFavorites().add(course);
            course.getFavorited().add(user);

            this.userRepository.save(user);
            this.courseRepository.save(course);
        }
        catch (NoSuchElementException e){
            return;
        }
    }

    public void removeFromFavorites(String email, String courseName){
        try {
            var user = this.userRepository.findAll().stream().filter(x -> x.getEmail().equals(email)).findFirst().get();
            var course = this.courseRepository.findAll().stream().filter(x -> x.getName().equals(courseName))
                    .findFirst().get();

            user.getFavorites().remove(course);
            course.getFavorited().remove(user);

            this.userRepository.save(user);
            this.courseRepository.save(course);
        }
        catch (NoSuchElementException e){
            return;
        }
    }
}
