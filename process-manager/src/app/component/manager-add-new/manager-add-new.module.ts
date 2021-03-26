import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewTeacherComponent } from './add-new-teacher/add-new-teacher.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ManagerAddNewRouting} from "./manager-add-new-routing";



@NgModule({
  declarations: [AddNewTeacherComponent, AddNewStudentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManagerAddNewRouting
  ]
})
export class ManagerAddNewModule { }
