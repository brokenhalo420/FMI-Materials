import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Course} from "../course-service/course";
import {Material} from "./material";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private url = "http://localhost:8080/material";

  constructor(private httpClient: HttpClient) { }

  getMaterialsForSpecificCourse(course: Course): Observable<Material[]> {
    const str = course.name;
    const paramsObj = {courseName: str};
    console.log('i am in the service ' + course.name + course.id + course.groups + str);
    return this.httpClient.get<Material[]>(this.url + '/get-by-course', {params: paramsObj});
  }

  createMaterial(material: Material, courseName: string): Observable<HttpResponse<Material>> {
    return this.httpClient.post<HttpResponse<Material>>(this.url + '/add-new-material-v2', {
      material: material,
      courseName: courseName
    })
  }
}
