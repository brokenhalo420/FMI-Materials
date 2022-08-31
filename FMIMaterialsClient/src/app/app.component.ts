import { Material } from './models/material';
import { Course } from './models/course';
import { MaterialService } from './services/material-service/material-service.service';
import { UserService } from './services/user-service/user-service.service';
import { CourseService } from './services/course-service/course-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FMIMaterialsClient';

  isLogged:boolean = false;
  activityIndex:number = -1;
  courses!:Course[];
  

  constructor(private coursesService:CourseService, private usersService:UserService, private materialService:MaterialService){

  }

  ngOnInit(): void {
    this.isLogged = this.checkACookieExists();
  }

  checkACookieExists():boolean {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('user='))) {
         return true;
    }
    else{
      return false;
    }
  }

  getMaterials(course:Course): Material[]{
    let result:Material[] = [];
    this.materialService.getMaterialsByCourse(course).then(data => result=data!);
    return result;
  }
}
