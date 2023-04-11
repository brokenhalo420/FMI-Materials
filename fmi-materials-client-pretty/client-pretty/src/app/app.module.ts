import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { RegisterComponent } from './register/register.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { CoursesComponent } from './courses/courses.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import { UsersComponent } from './users/users.component';
import {MatTableModule} from "@angular/material/table";
import { UserCreateComponent } from './user-create/user-create.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { CourseCreateComponent } from './courses/create/course-create/course-create.component';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialCreateComponent } from './material-create/material-create.component';
import {MatCardModule} from "@angular/material/card";
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    UsersComponent,
    UserCreateComponent,
    RegisterComponent,
    CourseCreateComponent,
    MaterialsComponent,
    MaterialCreateComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    IonicModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatGridListModule,
    MatIconModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RegisterComponent]
})
export class AppModule { }
