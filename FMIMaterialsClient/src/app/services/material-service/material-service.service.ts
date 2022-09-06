import { Course } from './../../models/course';
import { Material } from './../../models/material';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private client: HttpClient) {
  }

  addMaterial(courseName:string, material:Material){
    this.client.post(`http://localhost:8080/material/add-new-material?courseName=${courseName}`,material).toPromise();
  }

  getAllMaterials(){
    return this.client.get<Material[]>(`http://localhost:8080/material/all`).toPromise();
  }

  getMaterialsByName(name:string){
    return this.client.get<Material[]>(`http://localhost:8080/material/by-name?name=${name}`).toPromise();
  }

  deleteMaterialByName(name:string){
    this.client.delete(`http://localhost:8080/material/delete-by-name?name=${name}`).toPromise();
  }

  getMaterialsByCourse(course:Course){
    return this.client.get<Material[]>(`http://localhost:8080/material/get-by-course?courseName=${course.name}`).toPromise();
  }

  editMaterial(oldName:string, material:Material){
    this.client.put(`http://localhost:8080/material/edit?oldName=${oldName}`, material).toPromise();
  }
}
