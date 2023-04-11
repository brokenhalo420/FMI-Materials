import { Component } from '@angular/core';
import {UserService} from "../services/user-service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private userService: UserService) {
  }

  adminStatus: boolean = false;

  name: string = '';

  isLoggedIn(): boolean {
    return this.getCookie("user") !== "";
  }

  getCookie(cookieName: string): string {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  logout() {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  isAdmin(): boolean {
    if (this.isLoggedIn()) {
      if (this.getCookie("admin") == "Admin") {
        return true;
      }
    }
    return false;
  }
}
