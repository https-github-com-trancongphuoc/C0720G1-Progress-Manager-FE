import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcessRoutingModule} from './process-routing.module';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessDetailComponent } from './process-detail/process-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ApprovalTopicComponent } from './approval-topic/approval-topic.component';
import {CommentPostModule} from "../comment-post/comment-post.module";



@NgModule({
  declarations: [ProcessListComponent, ProcessDetailComponent, ApprovalTopicComponent],
    imports: [
        CommonModule,
        ProcessRoutingModule,
        ReactiveFormsModule,
        CommentPostModule
    ]
})
export class ProcessModule { }
