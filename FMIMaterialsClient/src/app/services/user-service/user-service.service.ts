import { Course } from './../../models/course';
import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) {
  }

  addUser(user:User){
    this.client.post(`http://localhost:8080/user/add`,user).toPromise();
  }

  getAllUsers(){
    return this.client.get<User[]>(`http://localhost:8080/user/all`).toPromise();
  }

  getUsersByName(name:string){
    return this.client.get<User[]>(`http://localhost:8080/user/get-by-name?name=${name}`).toPromise();
  }

  getUser(email:string, password:string){
    return this.client.get<User>(`http://localhost:8080/user/get?email=${email}&password=${password}`).toPromise();
  }

  deleteUserByEmailAndPassword(user:User){
    this.client.delete(`http://localhost:8080/user/delete?email=${user.email}&password=${user.password}`).toPromise();
  }

  getFavorites(email:string){
    return this.client.get<Course[]>(`http://localhost:8080/user/favorites?email=${email}`).toPromise();
  }

  addToFavorite(email:string, course:Course){
    this.client.put(`http://localhost:8080/user/favorites/add?courseName=${course.name}&email=${email}`,{}).toPromise();
  }

  removeFromFavorites(email:string, course:Course){
    this.client.put(`http://localhost:8080/user/favorites/remove?courseName=${course.name}&email=${email}`,{}).toPromise();
  }
}
