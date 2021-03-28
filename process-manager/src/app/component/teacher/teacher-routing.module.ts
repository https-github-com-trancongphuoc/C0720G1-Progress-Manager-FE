import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';
import {TeacherEditComponent} from "./teacher-edit/teacher-edit.component";


const routes: Routes = [
  {path :'list-teacher', component : TeacherListComponent},
  {path: 'create-teacher', component: TeacherCreateComponent},
  {path: 'edit-teacher/:idTeacher', component: TeacherEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
