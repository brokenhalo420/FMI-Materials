import { Material } from './../models/material';
import { MaterialService } from './../services/material-service/material-service.service';
import { Course } from './../models/course';
import { Component, Input, OnInit } from '@angular/core';
import { groupsAsString } from '../enums/group-type';
import { materialTypesAsString } from '../enums/material-type';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  isLogged: boolean = document.cookie.indexOf('user=') == -1 ? false : true;

  @Input()
  course!: Course;

  @Input()
  isInFavorites!:boolean;

  materials: Material[] = [];
  editor: boolean = false;
  editorMaterial: Material = {} as Material;
  groupsAsString = groupsAsString;
  materialTypesAsString = materialTypesAsString;
  oldName: string = "";

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.loadMaterials();
  }

  createMaterial() {
    this.editor = true;
  }

  saveNewMaterial() {
    if (this.oldName === "") {
      this.materialService.addMaterial(this.course.name, this.editorMaterial);
      this.materials.push(this.editorMaterial);
    }
    else {
      this.materialService.editMaterial(this.oldName, this.editorMaterial);
      this.materials[this.materials.indexOf(this.editorMaterial)] = this.editorMaterial;
      this.oldName = "";
    }
    this.editor = false;
    this.editorMaterial = {} as Material;
  }

  loadMaterials() {
    this.materialService.getMaterialsByCourse(this.course).then(data => {
      data?.forEach(x => {
        this.materials.push(x);
      })
    }).catch(err => {
      console.log('Cannot get materials for course')
    })
  }

  cancelEditor() {
    this.editorMaterial = {} as Material;
    this.editor = false;
  }

  deleteMaterial(index: number) {
    this.materialService.deleteMaterialByName(this.materials[index].name);
    this.materials.splice(index, 1);
  }

  editMaterial(index: number) {
    this.editorMaterial = this.materials[index];
    this.editor = true;
    this.oldName = this.editorMaterial.name;
  }

  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie.split(';').map(c => c.trim()).filter(cookie => {
      return cookie.substring(0, nameLenPlus) === `${name}=`;
    }).map(cookie => {
      return decodeURIComponent(cookie.substring(nameLenPlus));
    })[0];
  }

}
