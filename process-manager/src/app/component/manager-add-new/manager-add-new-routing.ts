import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddNewStudentComponent} from "./add-new-student/add-new-student.component";
import {AddNewTeacherComponent} from "./add-new-teacher/add-new-teacher.component";

const routes: Routes = [
  {path: 'create-student-excel', component: AddNewStudentComponent},
  {path: 'create-teacher-excel', component: AddNewTeacherComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerAddNewRouting { }
