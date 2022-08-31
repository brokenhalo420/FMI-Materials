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

  getUserById(id:number){
    return this.client.get<User>(`http://localhost:8080/user/get-by-id/${id}`).toPromise();
  }

  getUsersByName(name:string){
    return this.client.get<User[]>(`http://localhost:8080/user/get-by-name/${name}`).toPromise();
  }

  getUser(email:string, password:string){
    return this.client.get<User>(`http://localhost:8080/user/get/${email}&${btoa(password)}`);
  }

  deleteUserById(id:number){
    this.client.delete(`http://localhost:8080/user/delete-by-id/${id}`).toPromise();
  }

  deleteUserByEmailAndPassword(user:User){
    this.client.delete(`http://localhost:8080/user/delete/${user.email}&${btoa(user.password)}`).toPromise();
  }
}
