import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CommentPostListComponent} from "./comment-post-list/comment-post-list.component";
import {CommentPostReplyListComponent} from "./comment-post-reply-list/comment-post-reply-list.component";
import { CKEditorModule } from 'ngx-ckeditor';
import { CommentPostCreateComponent } from './comment-post-create/comment-post-create.component';
import { CommentReportListComponent } from './comment-report-list/comment-report-list.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [CommentPostListComponent, CommentPostReplyListComponent, CommentPostCreateComponent, CommentReportListComponent],
  exports: [
    CommentPostListComponent,
    CommentPostCreateComponent,
    CommentReportListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    RouterModule
  ]
})
export class CommentPostModule { }
