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

  isLogged: boolean = false;
  activityIndex: number = -1;
  courses!: Course[];


  constructor(private coursesService: CourseService, private usersService: UserService, private materialService: MaterialService) {

  }

  ngOnInit(): void {
    this.isLogged = this.checkACookieExists();
  }

  checkACookieExists(): boolean {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('user='))) {
      return true;
    }
    else {
      return false;
    }
  }

  getMaterials(course: Course): Material[] {
    let result: Material[] = [];
    this.materialService.getMaterialsByCourse(course).then(data => result = data!);
    return result;
  }

  logout() {
    (function () {
      var cookies = document.cookie.split("; ");
      for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
          var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
          var p = location.pathname.split('/');
          document.cookie = cookieBase + '/';
          while (p.length > 0) {
            document.cookie = cookieBase + p.join('/');
            p.pop();
          };
          d.shift();
        }
      }
    })();

    window.open('http://localhost:4200/','_self');
  }

  toHome(){
    window.location.href='http://localhost:4200/'
  }
}
