import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditFileComponent} from './edit-file/edit-file.component';
import {SubscribeTopicComponent} from './subscribe-topic/subscribe-topic.component';
import {RogressReportsComponent} from './progress-reports/rogress-reports.component';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {StudentEditComponent} from './student-edit/student-edit.component';


const routes: Routes = [
  {path: 'edit-file' , component: EditFileComponent},
  {path: 'subscribe-topic' , component: SubscribeTopicComponent},
  {path: 'progress-reports' , component: RogressReportsComponent},
  {path: 'list-student', component: StudentListComponent},
  {path: 'create-student', component: StudentCreateComponent},
  {path: 'edit-student/:idStudent', component: StudentEditComponent},
  {path: 'progress-reports/:id' , component: RogressReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
