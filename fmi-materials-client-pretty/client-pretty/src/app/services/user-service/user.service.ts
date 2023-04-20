import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {User} from "./user";
import {Course} from "../course-service/course";

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
    return this.httpClient.post(this.url + '/update', user);
    // return this.httpClient.post<User>(this.url + '/update', {id: user.id, name : user.name, email: user.email, type: user.type});
  }

  deleteUser(user: User): Observable<HttpResponse<User>> {
    return this.httpClient.delete<HttpResponse<User>>(this.url + '/delete-new', {responseType: 'json', body: user});
  }

  getUserByEmail(user: string): Observable<User> {
    return this.httpClient.get<User>(this.url + "/get-new", {
      params: {email: user}
    });
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<HttpResponse<User>> {
    return this.httpClient.post<HttpResponse<User>>(this.url + '/update-password', {
      "email": email,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    });
  }

  getFavouritesForSpecificUser(userEmail: string): Observable<Course[] | null> {

    return this.httpClient.get<Course[]>( this.url + '/favorites-v2', {
      params: {email: userEmail},
      responseType: "json"
    }).pipe(
      map(response => {
        console.log("RESPONSE IN THE SERVICEEE ", response);
        console.log("RESPONSEBODY IN THE SERVICEEE ");
        return response;
      }),
      catchError(err => {
        console.log("There was an error getting the favourites.", err);
        return of(null);
      })
    )
  };

  addToFavorites(courseId: number, userEmail: string): Observable<Course | null> {
    let id : string = String(courseId);
    return this.httpClient.put<HttpResponse<Course>>(this.url + "/favorites/add-v2", {
      id: id,
      email: userEmail
    }).pipe(
      map(response => {
        // Modify the response as needed before returning it
        return response.body;
      }),
      catchError(err => {
        console.log("There was an error adding to favourites ", err);
        return of(null); // Return an Observable that emits null in case of an error
      })
    );
  }

  removeFromFavorites(courseId: number, userEmail: string) {
    return this.httpClient.put<HttpResponse<Course>>(this.url + "/favorites/remove-v2", {
      id: courseId,
      email: userEmail
    }).pipe(
      map(response => {
        // Modify the response as needed before returning it
        return response.body;
      }),
      catchError(err => {
        console.log("There was an error adding to favourites ", err);
        return of(null); // Return an Observable that emits null in case of an error
      })
    );
  }
}
