package com.project.materials.fmi.repositories.services;
import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.exception.WrongPasswordException;
import com.project.materials.fmi.mappers.CourseMapper;
import com.project.materials.fmi.mappers.UserMapper;
import com.project.materials.fmi.models.Course;
import com.project.materials.fmi.models.User;
import com.project.materials.fmi.repositories.contracts.CourseDB;
import com.project.materials.fmi.repositories.contracts.UserDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
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

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    public UserDTO updatePassword(String email, String oldPassword, String newPassword) {
        UserDTO user = getUserByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("The user with the email " + email + " was not found");
        }
        User realUser = userRepository.getReferenceById(user.getId());
        if (comparePasswords(realUser.getPassword(), oldPassword)) {
            realUser.setPassword(newPassword);
            userRepository.save(realUser);
            return user;
        }
        throw new WrongPasswordException("Old password does not match with the real password.");
    }

    private boolean comparePasswords(String oldPassword, String realPassword) {
        return oldPassword.equals(realPassword);
    }//TODO use encryption and check in another class



    public Iterable<UserDTO> getUsersByName(String name){
        return userRepository.findAll().stream().filter(user -> name.equals(user.getName()))
                .map(UserMapper::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserByEmail(String email){
        return userRepository.findAll().stream().filter(x -> email.equals(x.getEmail())).map(UserMapper::toDTO).findFirst().get();
    }

    private User getRealUserByEmail(String email){
        return userRepository.findAll().stream().filter(x -> email.equals(x.getEmail())).findFirst().get();
    }

    public Optional<UserDTO> getUser(String email, String password){
        return userRepository.findAll().stream()
                .filter(user -> email.equals(user.getEmail()) && password.equals(user.getPassword()))
                .map(UserMapper::toDTO).findFirst();
    }

    public void addUser(User user){
        userRepository.save(user);
    }



    public UserDTO updateUser(UserDTO user) {
        User userInDb = userRepository.getReferenceById(user.getId());
        userInDb.setEmail(user.getEmail());
        userInDb.setName(user.getName());
        userInDb.setType(user.getType());
        return UserMapper.toDTO(userRepository.save(userInDb));
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

    public UserDTO deleteUserNew(UserDTO userDTO) {
        UserDTO user;
        try {
            user = UserMapper.toDTO(userRepository.getReferenceById(userDTO.getId()));
        }
        catch (NoSuchElementException e) {
            throw new RuntimeException();
        }
        userRepository.deleteById(userDTO.getId());
        return user;
    }

    public Iterable<CourseDTO> getFavorites(String email){
        return this.userRepository.findAll().stream().filter(x-> x.getEmail().equals(email)).findFirst().get().getFavorites()
                .stream().map(CourseMapper::toDTO).collect(Collectors.toList());
    }

    public List<CourseDTO> getFavoritesNew(String email){
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

    @Transactional
    public CourseDTO addToFavoritesNew(Long id, String email) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException());
        this.getRealUserByEmail(email).getFavorites().add(course);
        return CourseMapper.toDTO(course);
    }

    @Transactional
    public CourseDTO removeFromFavoritesNew(Long id, String email) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new EntityNotFoundException());
        this.getRealUserByEmail(email).getFavorites().remove(course);
        return CourseMapper.toDTO(course);
    }
}
