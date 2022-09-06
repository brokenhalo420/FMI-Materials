import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialsComponent } from './materials/materials.component'
import { MatSelectModule } from '@angular/material/select';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchResultsComponent } from './search-results/search-results.component'

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LoginFormComponent,
    LoginComponent,
    RegisterComponent,
    MaterialsComponent,
    FavoritesComponent,
    SearchResultsComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login-form', component: LoginFormComponent, children: [
        {path: 'login', component:LoginComponent},
        {path: 'register', component:RegisterComponent}
      ]},
      {path: 'courses', component:CoursesComponent},
      {path:'favorites', component:FavoritesComponent},
      {path: 'search', component:SearchResultsComponent}
    ]),
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSelectModule
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
