import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditFileComponent} from './edit-file/edit-file.component';
import {SubscribeTopicComponent} from './subscribe-topic/subscribe-topic.component';
import {RogressReportsComponent} from './rogress-reports/rogress-reports.component';


const routes: Routes = [
  {path: 'edit-file' , component: EditFileComponent},
  {path: 'subscribe-topic' , component: SubscribeTopicComponent},
  {path: 'progress-reports' , component: RogressReportsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
