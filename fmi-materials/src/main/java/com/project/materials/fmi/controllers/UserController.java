package com.project.materials.fmi.controllers;

import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.repositories.services.UserRepositoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping("/get-by-id/{id}")
    public Optional<UserDTO> getUserById(@PathVariable long id){
        return service.getUserById(id);
    }

    @GetMapping("/get/{email:.*}&{password:.*}")
    public Optional<UserDTO> getUser(@PathVariable String email, @PathVariable String password){
        return service.getUser(email,password);
    }

    @GetMapping("/get-by-name/{name=.*}")
    public Iterable<UserDTO> getUserByName(@PathVariable String name){
        return service.getUsersByName(name);
    }

    @PostMapping("/add")
    public void addUser(@RequestBody UserDTO user){
        service.addUser(user);
    }

    @DeleteMapping("/delete/{email=.*}&{password=.*}")
    public void deleteUser(@PathVariable String email, @PathVariable String password){
        service.deleteUser(email, password);
    }

    @DeleteMapping("/delete-by-id/{id}")
    public void deleteUser(@PathVariable long id){
        service.deleteUserById(id);
    }


}
