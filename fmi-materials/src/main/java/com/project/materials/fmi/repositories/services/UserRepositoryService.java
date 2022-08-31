package com.project.materials.fmi.repositories.services;
import com.project.materials.fmi.dtos.UserDTO;
import com.project.materials.fmi.mappers.UserMapper;
import com.project.materials.fmi.models.User;
import com.project.materials.fmi.repositories.contracts.UserDB;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

public class UserRepositoryService {
    private UserDB repository;
    
    @Autowired
    public UserRepositoryService(UserDB repository){
        this.repository = repository;
    }

    public Iterable<UserDTO> getAllUsers() {
        return repository.findAll().stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    public Iterable<UserDTO> getUsersByName(String name){
        return repository.findAll().stream().filter(user -> name.equals(user.getName()))
                .map(UserMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<UserDTO> getUser(String email, String password){
        return repository.findAll().stream()
                .filter(user -> email.equals(user.getEmail()) && password.equals(user.getPassword()))
                .map(UserMapper::toDTO).findFirst();
    }

    public void addUser(UserDTO user){
        User entry = new User();
        repository.save(UserMapper.fromDTO(entry,user));
    }

    public Optional<UserDTO> getUserById(long id){
        return repository.findById(id).map(UserMapper::toDTO);
    }

    public void deleteUserById(long id){
        repository.deleteById(id);
    }

    public void deleteUser(String email, String password){
        User user;
        try{
            user = repository.findAll().stream()
                    .filter(x -> email.equals(x.getEmail()) && password.equals(x.getPassword()))
                    .findFirst().get();
        } catch (NoSuchElementException e){
            return;
        }

        repository.delete(user);
    }
}
