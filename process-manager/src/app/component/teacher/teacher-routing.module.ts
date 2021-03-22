import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';


const routes: Routes = [
  {path :'list-teacher', component : TeacherListComponent},
  {path: 'create-teacher', component: TeacherCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
