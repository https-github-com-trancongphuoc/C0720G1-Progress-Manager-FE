import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../account/storage.service";
import {MessageManager} from "../message-manager";
import {CommentPostService} from "../comment-post.service";
import {WebSocketService} from "../../common/web-socket.service";

@Component({
  selector: 'app-comment-post-create',
  templateUrl: './comment-post-create.component.html',
  styleUrls: ['./comment-post-create.component.scss']
})
export class CommentPostCreateComponent implements OnInit {
  public editorValue: string;
  formGroup: FormGroup;
  account;
  email: string;
  processDetailId: number;
  teacherId: number;
  flagLoading: boolean = false;

  @Input() idInfoTopic;

  @Input() idProcess;

  validate_message = {
    'title': [
      {type: 'required', message: 'Tiêu đề câu hỏi không được để trống!'},
      {type: 'maxlength', message: 'Không nhập tiêu đề quá dài!'},
      {type: 'minlength', message: 'Không nhập tiêu đề quá ngắn!'},
    ],
    'content': [
      {type: 'required', message: 'Nội dung câu hỏi không được để trống!'},
    ]
  }


  constructor(public formBuilder: FormBuilder,
              public commentPostService: CommentPostService,
              public webSocketService: WebSocketService,
              public messageManager: MessageManager,
              public storageService: StorageService) {
  }

  ngOnInit(): void {
    this.getAccountPresent();
    this.createFrom();
  }

  /**
   * TrungTQ: Thêm mới bài đăng
   * */
  createFrom() {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(5)]],
      content: ['', [Validators.required]],
      accountId: [this.account.id],
      topicProcessId: [this.idInfoTopic.processList[0]?.id],
    })
  }

  /**
   * TrungTQ: Thêm mới bài đăng
   * */
  submitForm() {
    this.flagLoading = true;
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      this.formGroup.value.email = this.idInfoTopic.teacher.email;
      this.formGroup.value.processDetailId = this.idProcess;
      this.formGroup.value.teacherId = this.idInfoTopic.teacher.id;
      this.commentPostService.saveComment(this.formGroup.value).subscribe(data => {
        if (data != null) {
          this.messageManager.showMessageCreateNotRole();
        } else {
          this.messageManager.showMessageCreatePostSuccess();
          this.webSocketService.callServer().subscribe();
          setTimeout(() => {
            window.location.reload();
          }, 600)
        }
      });
    }
  }

  /**
   * TrungTQ: Lấy Tk hiện tại
   * */
  getAccountPresent() {
    this.account = this.storageService.getUser();
  }
}
