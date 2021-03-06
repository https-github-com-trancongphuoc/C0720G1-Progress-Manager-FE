import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcessListComponent} from './process-list/process-list.component';
import {ProcessDetailComponent} from './process-detail/process-detail.component';
import {StudentGuard} from "../common/gurad/student.guard";
import {TeacherGuard} from "../common/gurad/teacher.guard";
import {AdminGuard} from "../common/gurad/admin.guard";
import {ApprovalTopicComponent} from "./approval-topic/approval-topic.component";


const routes: Routes = [
  {path: 'process-manager', component: ProcessListComponent},
  {path: 'process-detail/:id', component: ProcessDetailComponent},
  {path: 'approval-topic', component: ApprovalTopicComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
