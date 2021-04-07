import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../../entity/IComment";
import {CommentPostService} from "../comment-post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../account/storage.service";
import {IAccount} from "../../../entity/IAccount";
import {MessageManager} from "../message-manager";
import {WebSocketService} from "../../common/web-socket.service";

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
  flagComment: boolean = false;
  flagLoading: boolean = false;
  commentNotification : any;
  accountSendId: number;
  processDetailId: number;

  @Input() idReply;

  @Input() idProcessReply;

  @Output() onDeleteComment = new EventEmitter();

  validate_message = {
    'title' : [
      {type: 'required', message: 'Tiêu đề câu hỏi không được để trống!'},
      {type: 'maxlength', message: 'Không nhập tiêu đề quá dài!'},
      {type: 'minlength', message: 'Không nhập tiêu đề quá ngắn!'},
    ],
    'content' : [
      {type: 'required', message: 'Nội dung không được để trống!'},
      {type: 'maxlength', message: 'Không nhập nội dung quá dài!'},
    ]
  }


  constructor(private commentPostService: CommentPostService,
              private storageService: StorageService,
              public messageManager: MessageManager,
              public webSocketService: WebSocketService,
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
      if (data == null){
        this.flagLoading = false
      } else {
        this.flagLoading = true;
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
      content:['', [Validators.required, Validators.maxLength(200)]],
      accountId: [this.account.id],
      replyCommentId: [this.idComment]
    })
    console.log('this.idProcessReply')
    console.log(this.idProcessReply)
  }

  /**
   * TrungTQ: Lấy id bình luận để sửa
   * */
  getEditComments(comments: IComment) {
    this.flagEdit = true;
    this.idCommentEdit = comments.id;
    this.formGroup = this.formBuilder.group({
      id: [comments.id],
      content: [comments.content, [Validators.required, Validators.maxLength(200)]]
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
      this.formGroup.value.processDetailId = this.idProcessReply;
      this.commentPostService.saveReply(this.formGroup.value).subscribe(data=>{
        if (data != null) {
          this.messageManager.showMessageCreateNotRole();
        } else {
          this.flagReply = false;
          this.ngOnInit();
          this.messageManager.showMessageCreateCommentSuccess();
          this.webSocketService.callServer().subscribe();
        }

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
