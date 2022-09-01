import { RouterModule } from '@angular/router';
import { MaterialService } from './services/material-service/material-service.service';
import { CourseService } from './services/course-service/course-service.service';
import { UserService } from './services/user-service/user-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login-form/submodels/login/login.component';
import { RegisterComponent } from './login-form/submodels/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LoginFormComponent,
    LoginComponent,
    RegisterComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login-form', component: LoginFormComponent},
    ]),
    FormsModule
  ],
  providers: [
    UserService,
    CourseService,
    MaterialService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
