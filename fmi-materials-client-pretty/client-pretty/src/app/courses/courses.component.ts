import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CourseService} from "../services/course-service/course.service";
import {Course} from "../services/course-service/course";
import {MatDialog} from "@angular/material/dialog";
import {CourseCreateComponent} from "./create/course-create/course-create.component";
import {MaterialService} from "../services/material-service/material.service";
import {Material} from "../services/material-service/material";
import {MaterialCreateComponent} from "../material-create/material-create.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses: Course[] = [];
  isAdmin: boolean = false;
  selectedCourse: Course | null = null;
  materials: Material[] = [];
  searchQuery: string = '';

  constructor(private router: Router, private courseService: CourseService, public dialog: MatDialog, private materialService: MaterialService) {
  }

  ngOnInit() {
    if (!document.cookie.includes('user')) {
      this.router.navigate(['/login']);
    }
    let cookies = document.cookie.split(";");
    for (let cookieItem of cookies) {
      cookieItem = cookieItem.trim();
      let check = cookieItem.split("=");
      if (check[0] === 'admin' && check[1] === 'Admin') {
        this.isAdmin = true;
      }
    }
    this.getCourses();
  }

  getCourses(){
    this.courseService.getAllCourses().subscribe(c => {
      this.courses = c;
    });
  }

  displayCourseCreation() {
    const dialogRef = this.dialog.open(CourseCreateComponent).afterClosed().subscribe(_ => {
      this.getCourses();
    });
  }

  getCorrespondingMaterials(course: Course, i: number, status: boolean) {
    if (status == true) {
      this.selectedCourse = null;
      return;
    }
    this.selectedCourse = course;
    // document.getElementById("mli" + i)
    this.materialService.getMaterialsForSpecificCourse(course).subscribe(r => {
      console.log('am i reaching 54 in courses component?');
      this.materials = r
      console.log('Fetched materials for course ' + course.name);
    });
  }

  displayMaterialCreation(course: Course) {
    this.dialog.open(MaterialCreateComponent,
      {
        data: {
          course: course.name
        }
      }).afterClosed().subscribe(r => {
      this.selectedCourse = course;
      this.getCorrespondingMaterials(course, 0, false);
    })
  }
}
