import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import {TeacherEditComponent} from "./teacher-edit/teacher-edit.component";



@NgModule({
  declarations: [TeacherListComponent, TeacherCreateComponent,TeacherEditComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TeacherModule { }
