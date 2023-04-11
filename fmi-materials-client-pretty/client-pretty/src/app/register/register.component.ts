import {Component, Inject} from '@angular/core';
import {UserService} from "../services/user-service/user.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide: boolean = true;
  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  selectedDay: number = 0;
  selectedMonth: number = 0;
  selectedYear: number = 1900;

  firstName: string = '';
  lastName: string = '';

  email: string = '';
  password: string = '';
  role: number = 0;
  createUser: boolean = false;

  constructor(private userService: UserService, private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: { createUser: boolean },
              public dialogRef: MatDialogRef<RegisterComponent>) {
    // Fill months array with options 1 to 12
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    this.createUser = this.data.createUser;

    // Fill years array with options 1900 to 2023
    const currentYear = new Date().getFullYear();
    for (let i = 1900; i <= currentYear; i++) {
      this.years.push(i);
    }

    // Initialize days array with options 1 to 31
    this.updateDaysArray(31);
  }

  onMonthSelected(month: number) {
    this.selectedMonth = month;
    const daysInMonth = new Date(this.selectedYear, month, 0).getDate();
    this.updateDaysArray(daysInMonth);
  }

  onYearSelected(year: number) {
    // Update days array based on selected month and year
    this.selectedYear = year;
    const daysInMonth = new Date(year, this.selectedMonth, 0).getDate();
    this.updateDaysArray(daysInMonth);
  }

  private updateDaysArray(maxDays: number) {
    this.days = [];
    for (let i = 1; i <= maxDays; i++) {
      this.days.push(i);
    }
  }

  submitRegistration() {
    this.userService.register(this.email, this.password, this.firstName, this.role).subscribe(() => {
      console.log("Successfully registered user.")
      console.log(this.createUser);
      if (!this.createUser) {
        this.router.navigate(['/login']);
      }
    });
    console.log("I have submitted my registration I am not very sure it works though.");
    this.dialogRef.close();
  }
}
