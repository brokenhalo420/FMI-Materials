import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Course} from "./course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url = "http://localhost:8080/courses";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.url + '/all').pipe(
      tap(_ => console.log('Fetched courses')),
      catchError(this.handleError<Course[]>('getAllCourses', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  createCourse(courseName: string, courseGroups: string[]): Observable<Course> {
    let groupsTemp = courseGroups[0];
    let body = {name: courseName, groups: groupsTemp};
    console.log(body);
    console.log('i am here');
    return this.httpClient.post<Course>(this.url + '/new-course', body);
      // .pipe(
      // tap(_ => console.log("Created course")),
      // catchError(this.handleError<Course>('getAllCourses', undefined))
    // );
  }
}
