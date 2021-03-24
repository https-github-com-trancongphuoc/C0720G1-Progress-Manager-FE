import {Component, Input, OnInit} from '@angular/core';
import {CommentPostService} from "../comment-post.service";
import {IComment} from "../../../entity/IComment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageManager} from "../message-manager";
import {StorageService} from "../../account/storage.service";
import {IAccount} from "../../../entity/IAccount";

@Component({
  selector: 'app-comment-post-list',
  templateUrl: './comment-post-list.component.html',
  styleUrls: ['./comment-post-list.component.scss']
})
export class CommentPostListComponent implements OnInit {
  public editorValue: string;

  page: number = 0;
  size: number = 1;
  iComment: IComment;
  iComments: IComment[];
  account: IAccount;
  formGroup: FormGroup;
  flagComment = false
  flagEdit = false
  public idComment: number;
  idCommentEdit: number;

  @Input() idProcess;

  constructor(private commentPostService: CommentPostService,
              public messageManager: MessageManager,
              private storageService: StorageService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllListCommentSizeInProcess();
    this.getAccountPresent();
  }

  getAccountPresent() {
    this.account = this.storageService.getUser();
  }

  getAllListCommentSizeInProcess() {
    this.commentPostService.getAllCommentSize(this.idProcess, this.page, this.size).subscribe(data => {
      this.iComments = data.content;
    })
  }

  onClickShowComment() {
    this.size = this.size + 2;
    this.getAllListCommentSizeInProcess();
  }

  onClickHideComment() {
    this.size = 1;
    this.getAllListCommentSizeInProcess();
  }


  getEdit(comments: IComment) {
    console.log('comments')
    console.log(comments)
    this.flagEdit = true;
    this.idCommentEdit = comments.id;
    this.formGroup = this.formBuilder.group({
      id: [comments.id],
      title: [comments.title, [Validators.required]],
      content: [comments.content, [Validators.required]]
    })
  }

  getIdComment(comments: IComment) {
    this.flagComment = true;
    this.idComment = comments.id;
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required]],
      accountId: [this.account.id],
      replyCommentId: [this.idComment]
    })
  }

  submitForReply() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      this.flagComment = false;
      return;
    } else {
      this.commentPostService.saveReply(this.formGroup.value).subscribe(data => {
        this.flagComment = false;
        this.ngOnInit();
        this.messageManager.showMessageCreateCommentSuccess();
      })
    }
  }

  editReply() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      this.flagEdit = false;
      return;
    } else {
      this.commentPostService.editCommentPost(this.idCommentEdit, this.formGroup.value).subscribe(data => {
        this.flagEdit = false;
        this.ngOnInit();
        this.messageManager.showMessageUpdateSuccess()
      })
    }
  }

  exitReply() {
    this.flagComment = false;
    this.flagEdit = false;
  }

  getDeleteQuestion(comments: IComment) {
    this.iComment = comments;
  }

  getDelete(): void {
    this.commentPostService.deleteComment(this.iComment.id).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageDeleteSuccess()
    });
  }

  getDeleteCommentById(idComment: number) {
    this.commentPostService.deleteComment(idComment).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageDeleteSuccess()
    });
  }

  getIdCommentDelete(idComment: number) {
    this.idComment = idComment;
  }
}
