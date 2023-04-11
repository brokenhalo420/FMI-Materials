import { Component } from '@angular/core';
import {User} from "../services/user-service/user";
import {UserService} from "../services/user-service/user.service";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  usersCopy: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'type'];
  editName: boolean = false;
  selectedUser = null;

  roles: string[] = [
    'User',
    'Admin'
  ];

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(u => {
      this.users = u;
      this.usersCopy = this.users;
      console.log('I am getting all users');
      console.log(u);
    })
  }

  ngOnInit() {
    this.getAllUsers();
  }


  saveChanges(user: User) {
    console.log(user);
    this.userService.updateUser(user).subscribe(_ => {
      this.getAllUsers();
    })
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(_ => {
      this.getAllUsers();
    })
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '1000px',
      height: '500px',
      data: { createUser: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUsers();
      console.log(`Dialog result: ${result}`);
    });
  }
}
