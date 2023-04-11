package com.project.materials.fmi.controllers;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.models.User;
import com.project.materials.fmi.repositories.services.UserRepositoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.builders.ResponseBuilder;

import java.util.Map;
import java.util.Optional;

@Api(tags="User Controller")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepositoryService userService;

    @GetMapping("/all")
    public Iterable<UserDTO> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/get")
    public Optional<UserDTO> getUser(@RequestParam String email, @RequestParam String password){
        return userService.getUser(email,password);
    }

    @PostMapping("/login")
    public Optional<UserDTO> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        return userService.getUser(username, password);
    }

    @GetMapping("/get-by-name")
    public Iterable<UserDTO> getUserByName(@RequestParam String name){
        return userService.getUsersByName(name);
    }

    @GetMapping("/get-by-email")
    public UserDTO getUserByEmail(@RequestParam String email){
        return userService.getUserByEmail(email);
    }

    @PostMapping("/add")
    public void addUser(@RequestBody UserDTO user){
        userService.addUser(user);
    }

    @PostMapping("/update")
    public void updateUser(@RequestBody UserDTO user){
//        System.out.println(user);
        userService.updateUser(user);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam String email, @RequestParam String password){
        userService.deleteUser(email, password);
    }

    @DeleteMapping("/delete-new")
    public ResponseEntity<UserDTO> deleteUser (@RequestBody UserDTO user) {
        return ResponseEntity.ok(this.userService.deleteUserNew(user));
    }

    @GetMapping("/favorites")
    public Iterable<CourseDTO> getFavorites(@RequestParam String email){
        return this.userService.getFavorites(email);
    }

    @PutMapping("/favorites/add")
    public void addToFavorites(@RequestParam String email, @RequestParam String courseName){
        this.userService.addToFavorites(email,courseName);
    }

    @PutMapping("/favorites/remove")
    public void removeFromFavorites(@RequestParam String email, @RequestParam String courseName){
        this.userService.removeFromFavorites(email,courseName);
    }

}
