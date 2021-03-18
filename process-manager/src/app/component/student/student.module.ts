import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentRoutingModule} from './student-routing.module';
import { RogressReportsComponent } from './rogress-reports/rogress-reports.component';
import { SubscribeTopicComponent } from './subscribe-topic/subscribe-topic.component';
import { EditFileComponent } from './edit-file/edit-file.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ RogressReportsComponent, SubscribeTopicComponent, EditFileComponent],
    imports: [
        CommonModule,
        StudentRoutingModule,
        FormsModule
    ]
})
export class StudentModule { }
