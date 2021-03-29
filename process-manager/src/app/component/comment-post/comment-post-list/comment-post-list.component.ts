import {Component, Input, OnInit} from '@angular/core';
import {CommentPostService} from "../comment-post.service";
import {IComment} from "../../../entity/IComment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageManager} from "../message-manager";
import {StorageService} from "../../account/storage.service";
import {IAccount} from "../../../entity/IAccount";
import {WebSocketService} from "../../common/web-socket.service";

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
  commentNotification : any;
  accountSendId: number;
  processDetailId: number;

  @Input() idProcess;

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
              public messageManager: MessageManager,
              private storageService: StorageService,
              public webSocketService: WebSocketService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllListCommentSizeInProcess();
    this.getAccountPresent();
  }
  /**
   * TrungTQ: Lấy id tk hiện tại
   * */
  getAccountPresent() {
    this.account = this.storageService.getUser();
  }
  /**
   * TrungTQ: Hiển thị danh sách đăng câu hỏi
   * */
  getAllListCommentSizeInProcess() {
    this.commentPostService.getAllCommentSize(this.idProcess, this.page, this.size).subscribe(data => {
      if (data == null){
        this.flagComment = false
      } else {
        this.flagComment = true;
        this.iComments = data.content;
      }
    })
  }
  /**
   * TrungTQ: ẩn hiện comment
   * */
  onClickShowComment() {
    this.size = this.size + 2;
    this.getAllListCommentSizeInProcess();
  }

  onClickHideComment() {
    this.size = 1;
    this.getAllListCommentSizeInProcess();
  }

  /**
   * TrungTQ: Lấy id bài đăng và form Edit
   * */
  getEdit(comments: IComment) {
    this.flagEdit = true;
    this.idCommentEdit = comments.id;
    this.formGroup = this.formBuilder.group({
      id: [comments.id],
      title: [comments.title, [Validators.required, Validators.maxLength(200), Validators.minLength(5)]],
      content: [comments.content, [Validators.required]]
    })
  }

  /**
   * TrungTQ: Lấy id bài đăng và form trả lời
   * */
  getIdComment(comments: IComment) {
    this.commentNotification = comments;
    this.flagComment = true;
    this.idComment = comments.id;
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(200)]],
      accountId: [this.account.id],
      replyCommentId: [this.idComment]
    })
  }

  /**
   * TrungTQ: Lấy đăng câu trả lời
   * */
  submitForReply() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      this.flagComment = false;
      return;
    } else {
      this.formGroup.value.accountSendId = this.commentNotification.account.id;
      this.formGroup.value.processDetailId = this.idProcess;
      this.commentPostService.saveReply(this.formGroup.value).subscribe(data => {
        if (data != null) {
          this.messageManager.showMessageCreateNotRole();
        } else {
          this.flagComment = false;
          this.ngOnInit();
          this.messageManager.showMessageCreateCommentSuccess();
          this.webSocketService.callServer().subscribe();
        }

      })
    }
  }
  /**
   * TrungTQ: Sửa câu trả lời
   * */
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

  /**
   * TrungTQ: Ẩn câu bình luận
   * */
  exitReply() {
    this.flagComment = false;
    this.flagEdit = false;
  }
  /**
   * TrungTQ: Lấy id bài đăng để xóa
   * */
  getDeleteQuestion(comments: IComment) {
    this.iComment = comments;
  }
  /**
   * TrungTQ: Xóa bài đăng với modal
   * */
  getDelete(): void {
    this.commentPostService.deleteComment(this.iComment.id).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageDeleteSuccess()
    });
  }
  /**
   * TrungTQ: Lấy id câu bình luận và xóa
   * */
  getDeleteCommentById(idComment: number) {
    this.commentPostService.deleteComment(idComment).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageDeleteSuccess()
    });
  }

  /**
   * TrungTQ: Lấy id bình luận
   * */
  getIdCommentDelete(idComment: number) {
    this.idComment = idComment;
  }
}
