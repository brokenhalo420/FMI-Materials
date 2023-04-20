import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserService} from "../services/user-service/user.service";
import {User} from "../services/user-service/user";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  hide: boolean = true;
  showPasswordFields: boolean | null = null;
  currentUser: User = {id: -1, name: "sashoiii", email: "sad", type: 9};
  passwordsMatch: boolean = true;
  showWrongPasswordError: boolean = false;
  @ViewChild("oldPassword") oldPassword: any;
  @ViewChild("oldPassword") newPassword1: any;
  @ViewChild("oldPassword") newPassword2: any;
  private displaySuccessfulPasswordChangeMessage: boolean = false;


  ngOnInit() {
    this.userService.getUserByEmail(this.cookieService.get("email")).subscribe(result => {
      this.currentUser = result;
      console.log(this.currentUser);
    })
  }

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private _snackBar: MatSnackBar) {
  }


  saveEmail(value: string) {
    this.currentUser.email = value;
    this.userService.updateUser(this.currentUser).subscribe({
      next: (result) => {
        console.log(result);
        this.cookieService.set('email', this.currentUser.email);
        this._snackBar.open("Successfully changed email.", undefined , {
          duration: 3000
        });
      },
      error: (err) => {
        console.log("There was an error with saving the email " + err);
      }
    })
    ;
  }

  checkPasswords(password1: string, password2: string) {
    this.passwordsMatch = password1 == password2;
  }

  editPassword(oldPassword: string, newPassword: string) {
    this.userService.changePassword(this.currentUser.email, oldPassword, newPassword).subscribe({
      next: response => {
        this.showWrongPasswordError = false;
        console.log(response);
        // this.router.navigate(["/profile"]);
        this.oldPassword.nativeElement.value = "";
        this.newPassword1.nativeElement.value = "";
        this.newPassword2.nativeElement.value = "";
        this.showPasswordFields = false;
        this.displaySuccessfulPasswordChangeMessage = true;
        this._snackBar.open("Successfully changed password.", undefined , {
          duration: 3000
        });
      },
      error: err => {
        console.log("There was an error with updating the password "+ err);
        this.oldPassword.nativeElement.value = "";
        this.newPassword1.nativeElement.value = "";
        this.newPassword2.nativeElement.value = "";
        this.showWrongPasswordError = true;
      }
    });
  }
}
