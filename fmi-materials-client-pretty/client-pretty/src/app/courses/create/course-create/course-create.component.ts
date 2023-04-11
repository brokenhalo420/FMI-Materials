import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CourseService} from "../../../services/course-service/course.service";

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent {
  Group: string[] = [
    'Mathematics', 'Informatics', 'Biology'
  ]

  courseName: string = '';
  courseGroups: string[] = [];

  constructor(
    private courseService: CourseService,
    public dialogRef: MatDialogRef<CourseCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
  }


  onNoClick() {
    this.dialogRef.close();
  }

  createCourse() {
    if (this.courseName != '' && this.courseGroups.length != 0) {
      this.courseService.createCourse(this.courseName, this.courseGroups).subscribe(r => {
          console.log(r);
        }
      );
    }
  }
}
