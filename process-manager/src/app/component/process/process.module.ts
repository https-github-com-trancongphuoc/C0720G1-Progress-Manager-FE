import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcessRoutingModule} from './process-routing.module';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';



@NgModule({
  declarations: [ProcessListComponent, ProcessDetailComponent],
  imports: [
    CommonModule,
    ProcessRoutingModule
  ]
})
export class ProcessModule { }
