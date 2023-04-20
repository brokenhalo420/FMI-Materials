import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CourseService} from "../services/course-service/course.service";
import {Course} from "../services/course-service/course";
import {MatDialog} from "@angular/material/dialog";
import {CourseCreateComponent} from "./create/course-create/course-create.component";
import {MaterialService} from "../services/material-service/material.service";
import {Material} from "../services/material-service/material";
import {MaterialCreateComponent} from "../material-create/material-create.component";
import {UserService} from "../services/user-service/user.service";

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
  userEmail: string = '';
  favouritesList: Course[] | null = [];

  constructor(private router: Router, private userService: UserService, private courseService: CourseService, public dialog: MatDialog, private materialService: MaterialService) {
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
        continue;
      }
      if (check[0] === 'email') {
        this.userEmail = check[1];
      }
    }
    this.getCourses();
    this.getFavourites();
  }

  getFavourites() {
    this.userService.getFavouritesForSpecificUser(this.userEmail).subscribe({
      next: response => {
        console.log("USER EMAIL " + this.userEmail);
        this.favouritesList = response;
        console.log("THIS IS THE RESPONSE " + response);
        console.log(response);
        console.log(this.favouritesList);
      },
      error: err => {
        console.log("There was an error with fetching the favourites " + err);
      }
    });
  }

  getCourses() {
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

  isFavorite(course: Course): boolean {
    if (this.favouritesList != null) {
      for(let i = 0; i < this.favouritesList?.length; i++) {
        if (course.id === this.favouritesList.at(i)?.id) {
          return true;
        }
      }
    }
    return false;
  }

  addToFavorites(course: Course) {
    console.log("THIS IS THE COURSE ID " + course.id);
    this.userService.addToFavorites(course.id, this.userEmail).subscribe({
      next: response => {
        console.log(response);
        this.getFavourites();
        console.log("THIS IS THE FAOVURITES LIST" + this.favouritesList);
      },
      error: err => {
        console.log("Some kind of error occurred when adding to favourites ", err);
      }
    });
  }

  removeFromFavorites(course: any) {
    this.userService.removeFromFavorites(course.id, this.userEmail).subscribe({
      next: response => {
        console.log(response);
        this.getFavourites();
        console.log("THIS IS THE FAOVURITES LIST" + this.favouritesList);
      },
      error: err => {
        console.log("Some kind of error occurred when adding to favourites ", err);
      }
    });
  }
}
