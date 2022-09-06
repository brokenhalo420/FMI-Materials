import { Component, OnInit } from '@angular/core';
import { groupsAsString } from '../enums/group-type';
import { materialTypesAsString } from '../enums/material-type';
import { Course } from '../models/course';
import { CourseService } from '../services/course-service/course-service.service';
import { MaterialService } from '../services/material-service/material-service.service';
import { UserService } from '../services/user-service/user-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  isLogged: boolean = document.cookie.indexOf('user=') == -1 ? false : true;

  courses: Course[] = [];

  editor: boolean = false;
  editorCourse: Course = {} as Course;

  groupsAsString = groupsAsString;
  materialTypesAsString = materialTypesAsString;
  oldName: string = "";

  favorites:Course[] = [];

  constructor(private courseService: CourseService, private materialService: MaterialService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadFavorite();
    this.loadCourses();
  }

  createCourse() {
    this.editor = true;
  }

  loadCourses() {
    this.courseService.getAllCourses().then(data => {
      data?.forEach(x => {
        this.courses.push(x);
      })
    }).catch(x => {
      console.log('Could not retrieve courses');
    });
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

  unfavorite(index:number){
    this.userService.removeFromFavorites(this.getCookie('user'),this.courses[index]);
    window.location.reload();
  }
}
