import { UserService } from './../../../services/user-service/user-service.service';
import { UserType } from './../../../enums/user-type';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = {} as User;

  constructor(private service:UserService) { }

  ngOnInit(): void {
  }

  register(){
    this.user.type=UserType.User;
    this.service.addUser(this.user);
    alert("Successfully registered!");
  }

}
