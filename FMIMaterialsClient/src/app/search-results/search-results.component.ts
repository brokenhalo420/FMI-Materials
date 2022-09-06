import { Component, Input, OnInit } from '@angular/core';
import { groupsAsString } from '../enums/group-type';
import { materialTypesAsString } from '../enums/material-type';
import { Course } from '../models/course';
import { CourseService } from '../services/course-service/course-service.service';
import { MaterialService } from '../services/material-service/material-service.service';
import { UserService } from '../services/user-service/user-service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  search:string = "";

  isLogged: boolean = document.cookie.indexOf('user=') == -1 ? false : true;

  courses: Course[] = [];
  materials: [{}] = [{}];

  editor: boolean = false;
  editorCourse: Course = {} as Course;

  groupsAsString = groupsAsString;
  materialTypesAsString = materialTypesAsString;
  oldName: string = "";

  favorites:Course[] = [];

  constructor(private courseService: CourseService, private materialService: MaterialService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadFavorite();
  }

  createCourse() {
    this.editor = true;
  }

  saveNewCourse() {
    if (this.oldName === "") {
      this.courseService.addCourse(this.editorCourse);
      this.courses.push(this.editorCourse);
    }
    else {
      this.courseService.editCourse(this.oldName, this.editorCourse);
      this.courses[this.courses.indexOf(this.editorCourse)] = this.editorCourse;
      this.oldName = "";
    }
    this.editor = false;
    this.editorCourse = {} as Course;
  }

  loadCourses() {
    this.courseService.getCoursesByName(this.search).then(data => {
      data?.forEach(x => {
        this.courses.push(x);
      })
    }).catch(x => {
      console.log('Could not retrieve courses');
    });
  }

  cancelEditor() {
    this.editorCourse = {} as Course;
    this.editor = false;
  }

  deleteCourse(index: number) {
    this.courseService.deleteCourseByName(this.courses[index].name);
    this.courses.splice(index, 1);
  }

  editCourse(index: number) {
    this.editorCourse = this.courses[index];
    this.editor = true;
    this.oldName = this.editorCourse.name;
  }

  loadFavorite() {
    this.userService.getFavorites(this.getCookie('user')).then(data => {
      data?.forEach(x => {
        this.favorites.push(x);
      })
    }).catch(err => {
      console.log(err);
    });    
  }

  isFavorite(index:number){
    let exists:boolean = false;

    this.favorites.forEach(x => {
      if(x.name === this.courses[index].name) {
        exists = true;
      }
    })

    return exists;
  }
  
  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie.split(';').map(c => c.trim()).filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      }).map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0];
  }

  favorite(index:number){
    this.userService.addToFavorite(this.getCookie('user'),this.courses[index]);
    this.loadFavorite();
    window.location.reload();
  }

  unfavorite(index:number){
    this.userService.removeFromFavorites(this.getCookie('user'),this.courses[index]);
    window.location.reload();
  }

}
