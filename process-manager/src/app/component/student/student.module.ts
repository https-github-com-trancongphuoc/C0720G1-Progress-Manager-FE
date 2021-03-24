import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import { RogressReportsComponent } from './progress-reports/rogress-reports.component';
import { SubscribeTopicComponent } from './subscribe-topic/subscribe-topic.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import { StudentListComponent } from './student-list/student-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ RogressReportsComponent, SubscribeTopicComponent, EditFileComponent, StudentListComponent, StudentCreateComponent, StudentEditComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class StudentModule { }
