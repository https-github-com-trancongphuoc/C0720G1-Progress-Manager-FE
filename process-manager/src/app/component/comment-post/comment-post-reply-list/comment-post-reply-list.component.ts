import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../../entity/IComment";
import {CommentPostService} from "../comment-post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../account/storage.service";
import {IAccount} from "../../../entity/IAccount";
import {MessageManager} from "../message-manager";

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
  flagEdit = false
  public idComment: number;
  idCommentEdit: number;
  formGroup: FormGroup;
  account: IAccount;

  @Input() idReply;

  @Output() onDeleteComment = new EventEmitter();

  constructor(private commentPostService: CommentPostService,
              private storageService: StorageService,
              public messageManager: MessageManager,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllListReplySizeInComment();
    this.getAccountPresent();
  }

  getAccountPresent() {
    this.account = this.storageService.getUser();
  }

  getAllListReplySizeInComment() {
    this.commentPostService.getAllReplySize(this.idReply, this.page, this.size).subscribe(data => {
      if (data != null) {
        this.iComment = data.content;
      }
    });
  }

  getIdComment(comments: IComment) {
    this.flagReply = true;
    this.idComment = comments.id;
    this.formGroup = this.formBuilder.group({
      content:['', [Validators.required]],
      accountId: [this.account.id],
      replyCommentId: [this.idComment]
    })
  }

  getEditComments(comments: IComment) {
    this.flagEdit = true;
    this.idCommentEdit = comments.id;
    this.formGroup = this.formBuilder.group({
      id: [comments.id],
      content: [comments.content, [Validators.required]]
    })
  }

  submitForReply() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      this.flagReply = false;
      return;
    } else {
      this.commentPostService.saveReply(this.formGroup.value).subscribe(data=>{
        this.flagReply = false;
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
      this.commentPostService.editComment(this.idCommentEdit, this.formGroup.value).subscribe(data => {
        this.flagEdit = false;
        this.ngOnInit();
        this.messageManager.showMessageUpdateSuccess()
      })
    }
  }

  exitReply() {
    this.flagReply = false;
    this.flagEdit = false;
  }

  onClickShowComment() {
    this.size = this.size + 2;
    this.getAllListReplySizeInComment();
  }

  onClickHideComment() {
    this.size = 1;
    this.getAllListReplySizeInComment();
  }

  getCommentDeleteById(idComment: number) {
    this.onDeleteComment.emit(idComment);
  }

}
