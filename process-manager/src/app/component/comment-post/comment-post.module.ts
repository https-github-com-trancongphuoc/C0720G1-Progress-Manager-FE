import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CommentPostListComponent} from "./comment-post-list/comment-post-list.component";
import {CommentPostReplyListComponent} from "./comment-post-reply-list/comment-post-reply-list.component";
import {CommentPostUpdateComponent} from "./comment-post-update/comment-post-update.component";
import {CommentPostCreateComponent} from "./comment-post-create/comment-post-create.component";
import { CommentPostReplyCreateComponent } from './comment-post-reply-create/comment-post-reply-create.component';
import { CommentPostReplyEditComponent } from './comment-post-reply-edit/comment-post-reply-edit.component';



@NgModule({
  declarations: [CommentPostListComponent, CommentPostReplyListComponent, CommentPostUpdateComponent, CommentPostCreateComponent, CommentPostReplyCreateComponent, CommentPostReplyEditComponent],
  exports: [
    CommentPostListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ]
})
export class CommentPostModule { }
