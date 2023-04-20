import { Component } from '@angular/core';
import { UserService } from "../services/user-service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // private username: string;
  // private password: string;
  //
  constructor(private userService: UserService, private snackBar: MatSnackBar,
              private router: Router, private cookieService: CookieService) {
  }

  successfullyLoggedIn: boolean = false;
  username: string = '';
  password: string = '';
  errorOccured: boolean = false;
  successfulLogin: boolean = false;

  submitLogin() {
    console.log(this.username + ' ' + this.password);
    this.userService.login(this.username, this.password).subscribe(x => {
      if (x) {
        console.log('Successfully logged in with username ' + this.username);
        this.cookieService.deleteAll();
        document.cookie += "user=" + x.name;
        this.cookieService.set('admin', x.type.valueOf().toString());
        this.cookieService.set('email', x.email);
        this.successfulLogin = true;
        this.router.navigate(['/']);
      }
      else {
        console.log('Error logging in');
        this.snackBar.open('Incorrect username or password', 'Close', {
          duration: 7000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
        this.errorOccured = true;
      }
    });
  }
  ngOnInit() {
    if (document.cookie.includes('user')) {
      this.router.navigate(['/']);
    }
  }
}
