import { UserService } from './../../../services/user-service/user-service.service';
import { UserType } from './../../../enums/user-type';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { CryptorService } from 'src/app/utilities/cryptor/cryptor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = {} as User;

  constructor(private service:UserService, private cryptor:CryptorService) { }

  ngOnInit(): void {
  }

  register(){
    let content = {} as User;
    content.type = UserType.User;
    content.email = this.user.email;
    content.name = this.user.name;
    content.password = this.cryptor.encrypt(this.user.password);
    this.service.addUser(content);
    alert("Successfully registered!");
  }

}
