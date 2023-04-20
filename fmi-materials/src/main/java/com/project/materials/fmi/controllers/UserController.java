package com.project.materials.fmi.controllers;

import com.project.materials.fmi.dtos.CourseDTO;
import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.exception.WrongPasswordException;
import com.project.materials.fmi.models.Course;
import com.project.materials.fmi.models.User;
import com.project.materials.fmi.repositories.services.UserRepositoryService;
import com.project.materials.fmi.security.AuthService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.builders.ResponseBuilder;

import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Api(tags = "User Controller")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserRepositoryService userService;


    private final AuthService authService;

    @GetMapping("/all")
    public Iterable<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get")
    public Optional<UserDTO> getUser(@RequestParam String email, @RequestParam String password) {
        return userService.getUser(email, password);
    }

    @GetMapping("/get-new")
    public ResponseEntity<UserDTO> getUser(@RequestParam String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PostMapping("/login")
    public Optional<UserDTO> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        UserDTO user = authService.login(username, password);
        if (user == null) {
            throw new WrongPasswordException();
        }
        return userService.getUser(username, password);
    }

    @GetMapping("/get-by-name")
    public Iterable<UserDTO> getUserByName(@RequestParam String name) {
        return userService.getUsersByName(name);
    }

    @GetMapping("/get-by-email")
    public UserDTO getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping("/add")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }


    @PostMapping("/update")
    public void updateUser(@RequestBody UserDTO user) {
//        System.out.println(user);
        userService.updateUser(user);
    }

    @PostMapping("/update-password")
    public ResponseEntity<UserDTO> updateUserPassword(@RequestBody Map<String, String> body) {
        System.out.println(body);
        String email = body.get("email");
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");
        UserDTO result = this.userService.updatePassword(email, oldPassword, newPassword);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam String email, @RequestParam String password) {
        userService.deleteUser(email, password);
    }

    @DeleteMapping("/delete-new")
    public ResponseEntity<UserDTO> deleteUser(@RequestBody UserDTO user) {
        return ResponseEntity.ok(this.userService.deleteUserNew(user));
    }

    @GetMapping("/favorites")
    public Iterable<CourseDTO> getFavorites(@RequestParam String email) {
        return this.userService.getFavorites(email);
    }

    @GetMapping("/favorites-v2")
    public ResponseEntity<List<CourseDTO>> getFavoritesNew(@RequestParam String email) {
        List<CourseDTO> result = this.userService.getFavoritesNew(email);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/favorites/add")
    public void addToFavorites(@RequestParam String email, @RequestParam String courseName) {
        this.userService.addToFavorites(email, courseName);
    }

    @PutMapping("/favorites/remove")
    public void removeFromFavorites(@RequestParam String email, @RequestParam String courseName) {
        this.userService.removeFromFavorites(email, courseName);
    }
    @PutMapping("/favorites/add-v2")
    public ResponseEntity<CourseDTO> addToFavoritesV2(@RequestBody Map<String, String> body) {
        String id = body.get("id");
        String email = body.get("email");
        return ResponseEntity.ok(this.userService.addToFavoritesNew(Long.valueOf(id), email));
    }

    @PutMapping("/favorites/remove-v2")
    public ResponseEntity<CourseDTO> removeFromFavoritesV2(@RequestBody Map<String, String> body) {
        String id = body.get("id");
        String email = body.get("email");
        return ResponseEntity.ok(this.userService.removeFromFavoritesNew(Long.valueOf(id), email));
    }
}
