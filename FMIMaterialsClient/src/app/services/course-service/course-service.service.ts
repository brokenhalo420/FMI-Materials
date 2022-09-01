import { User } from './../../models/user';
import { Course } from './../../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private client: HttpClient) {
  }

  getAllCourses(){
    return this.client.get<User[]>('http://localhost:8080/courses/all').toPromise();
  }

  getCourse(id:number){
    return this.client.get<User>(`http://localhost:8080/courses/get-course/${id}`).toPromise();
  }

  addCourse(course:Course){
    this.client.post(`http://localhost:8080/courses/new-course`, course ).toPromise();
  }

  deleteCourse(id:number){
    this.client.delete(`http:localhost:8080/courses/delete-by-id/${id}`).toPromise();
  }

  deleteCourseByName(name:string){
    this.client.delete(`http://localhost:8080/courses/delete-by-name/${name}`).toPromise();
  }

}
