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

  addMaterial(material:Material){
    this.client.post(`http://localhost:8080/material/add-new-material`,material).toPromise();
  }

  getAllMaterials(){
    return this.client.get<Material[]>(`http://localhost:8080/material/all`).toPromise();
  }

  getMaterialById(id:number){
    return this.client.get<Material>(`http://localhost:8080/material/all/${id}`).toPromise();
  }

  getMaterialsByName(name:string){
    return this.client.get<Material[]>(`http://localhost:8080/material/by-name/${name}`).toPromise();
  }

  deleteMaterialById(id:number){
    this.client.delete(`http://localhost:8080/material/delete-by-id/${id}`).toPromise();
  }

  deleteMaterialByName(name:string){
    this.client.delete(`http://localhost:8080/material/delete-by-name/${name}`).toPromise();
  }

  getMaterialsByCourse(course:Course){
    return this.client.get<Material[]>(`http://localhost:8080/material/get-by-course/${name}`).toPromise();
  }
}
