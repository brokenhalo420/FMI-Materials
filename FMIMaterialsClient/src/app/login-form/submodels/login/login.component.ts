import { CryptorService } from './../../../utilities/cryptor/cryptor.service';
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
  constructor(private service:UserService, private cryptor:CryptorService) { }

  ngOnInit(): void {
  }

  login(){
    let user!:User;
    this.service.getUser(this.user.email,this.cryptor.encrypt(this.user.password)).then(x => {
      if(x){
        document.cookie  += `user=${x.email}`;
        alert("Logged in succesfully");
        document.location.href='http://localhost:4200';
      }
      else {
        alert("Did not log in succesfully");
      }
    });
  }
}
