import { User } from './../../models/user';
import { Course } from './../../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private client: HttpClient) {
  }

  getAllCourses(){
    return this.client.get<Course[]>('http://localhost:8080/courses/all').toPromise();
  }

  getCoursesByName(name:String){
    return this.client.get<Course[]>(`http://localhost:8080/courses/search?phrase=${name}`).toPromise();
  }

  addCourse(course:Course){
    this.client.post(`http://localhost:8080/courses/new-course`, course ).toPromise();
  }


  deleteCourseByName(name:string){
    this.client.delete(`http://localhost:8080/courses/delete-by-name?name=${name}`).toPromise();
  }

  editCourse(name:String, course:Course){
    this.client.put(`http://localhost:8080/courses/edit?oldName=${name}`,course).toPromise();
  }

}
