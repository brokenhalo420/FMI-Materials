import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    console.log('entering 15');
    console.log(username + " " + password + 22);
    let som = this.httpClient.post<User>(this.url + '/login', {username: username, password: password});
    console.log(som);
    console.log('entering 17');
    return som;
  }

  register(email: string, password: string, firstName: string, type: number = 0): Observable<any> {
    return this.httpClient.post(this.url + '/add', {email: email, password: password, name: firstName, type: type});
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/all', {});
  }

  updateUser(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.post(this.url + '/update',  user);
    // return this.httpClient.post<User>(this.url + '/update', {id: user.id, name : user.name, email: user.email, type: user.type});
  }

  deleteUser(user: User): Observable<HttpResponse<User>> {
    return this.httpClient.delete<HttpResponse<User>>(this.url + '/delete-new', {responseType: 'json', body: user});
  }
}
