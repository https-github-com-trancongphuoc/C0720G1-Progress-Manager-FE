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

  commentNotification : any;
  accountSendId: number;

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
  /**
   * TrungTQ: Lấy id tk hiện tại
   * */
  getAccountPresent() {
    this.account = this.storageService.getUser();
  }

  /**
   * TrungTQ: hiển thị bình luận
   * */
  getAllListReplySizeInComment() {
    this.commentPostService.getAllReplySize(this.idReply.id, this.page, this.size).subscribe(data => {
      if (data != null) {
        this.iComment = data.content;
      }
    });
  }

  /**
   * TrungTQ: Lấy id bình luận trên để trả lời
   * */
  getIdComment(comments: IComment) {
    this.commentNotification = comments;
    this.flagReply = true;
    this.idComment = comments.id;
    this.formGroup = this.formBuilder.group({
      content:['', [Validators.required]],
      accountId: [this.account.id],
      replyCommentId: [this.idComment]
    })
  }

  /**
   * TrungTQ: Lấy id bình luận để sửa
   * */
  getEditComments(comments: IComment) {
    this.flagEdit = true;
    this.idCommentEdit = comments.id;
    this.formGroup = this.formBuilder.group({
      id: [comments.id],
      content: [comments.content, [Validators.required]]
    })
  }

  /**
   * TrungTQ: Trả lời bình luận
   * */
  submitForReply() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      this.flagReply = false;
      return;
    } else {
      this.formGroup.value.accountSendId = this.commentNotification.account.id;
      this.commentPostService.saveReply(this.formGroup.value).subscribe(data=>{
        this.flagReply = false;
        this.ngOnInit();
        this.messageManager.showMessageCreateCommentSuccess();
      })
    }
  }
  /**
   * TrungTQ: sửa bình luận
   * */
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

  /**
   * TrungTQ: ẩn hiện hình luận
   * */
  onClickShowComment() {
    this.size = this.size + 2;
    this.getAllListReplySizeInComment();
  }

  onClickHideComment() {
    this.size = 1;
    this.getAllListReplySizeInComment();
  }

  /**
   * TrungTQ: Lấy id để xóa
   * */
  getCommentDeleteById(idComment: number) {
    this.onDeleteComment.emit(idComment);
  }

}
