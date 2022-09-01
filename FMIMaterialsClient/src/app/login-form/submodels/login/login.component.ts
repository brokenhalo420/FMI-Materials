import { UserService } from './../../../services/user-service/user-service.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = {} as User;
  constructor(private service:UserService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.service.getUser(this.user.email,this.user.password) != null){
      document.cookie  += `user=${this.user.email}`;
      alert("Logged in succesfully");
      document.location.href='http://localhost:4200';
    }
    else {
      alert("Did not log in succesfully");
    }
  }
}
