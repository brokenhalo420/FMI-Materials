package com.project.materials.fmi.controllers;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.repositories.services.UserRepositoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Api(tags="User Controller")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepositoryService service;

    @GetMapping("/all")
    public Iterable<UserDTO> getAllUsers(){
        return service.getAllUsers();
    }

    @GetMapping("/get")
    public Optional<UserDTO> getUser(@RequestParam String email, @RequestParam String password){
        return service.getUser(email,password);
    }

    @GetMapping("/get-by-name")
    public Iterable<UserDTO> getUserByName(@RequestParam String name){
        return service.getUsersByName(name);
    }

    @GetMapping("/get-by-email")
    public UserDTO getUserByEmail(@RequestParam String email){
        return service.getUserByEmail(email);
    }

    @PostMapping("/add")
    public void addUser(@RequestBody UserDTO user){
        service.addUser(user);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam String email, @RequestParam String password){
        service.deleteUser(email, password);
    }

    @GetMapping("/favorites")
    public Iterable<CourseDTO> getFavorites(@RequestParam String email){
        return this.service.getFavorites(email);
    }

    @PutMapping("/favorites/add")
    public void addToFavorites(@RequestParam String email, @RequestParam String courseName){
        this.service.addToFavorites(email,courseName);
    }

    @PutMapping("/favorites/remove")
    public void removeFromFavorites(@RequestParam String email, @RequestParam String courseName){
        this.service.removeFromFavorites(email,courseName);
    }

}
