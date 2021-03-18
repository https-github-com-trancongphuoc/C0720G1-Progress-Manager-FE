import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../../../entity/IComment";
import {CommentPostService} from "../comment-post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../account/storage.service";

@Component({
  selector: 'app-comment-post-reply-list',
  templateUrl: './comment-post-reply-list.component.html',
  styleUrls: ['./comment-post-reply-list.component.scss']
})
export class CommentPostReplyListComponent implements OnInit {
  page: number = 0;
  size: number = 1;
  iComment: IComment[];
  flagReply = false
  idComment: number;
  formGroup: FormGroup;
  account

  @Input() idReply;

  constructor(private commentPostService: CommentPostService,
              private storageService: StorageService,
              public formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.getAllListReplySizeInComment();
    this.getAccountPresent();
  }

  getAccountPresent() {
    this.account = this.storageService.getUser();
  }

  getAllListReplySizeInComment() {
    console.log(this.idReply)
    this.commentPostService.getAllReplySize(this.idReply, this.page, 10).subscribe(data => {
      this.iComment = data.content;
      console.log(data.content)
    });
  }

  getIdComment(comments: IComment) {
    // this.flagReply = true;
    // this.idComment = comments.id;
    // this.formGroup = this.formBuilder.group({
    //   content:['', [Validators.required]],
    //   accountId: [this.account.id],
    //   commentId: [this.idComment]
    // })
  }
}
