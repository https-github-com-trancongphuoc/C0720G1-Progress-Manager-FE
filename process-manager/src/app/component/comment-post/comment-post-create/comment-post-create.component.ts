import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../account/storage.service";
import {MessageManager} from "../message-manager";
import {CommentPostService} from "../comment-post.service";
import {ToastrService} from "ngx-toastr";
import {IComment} from "../../../entity/IComment";

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

  constructor(public formBuilder: FormBuilder,
              public commentPostService: CommentPostService,
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
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      accountId: [this.account.id],
      topicProcessId: [this.idInfoTopic.processList[0].id],
    })
  }
  /**
   * TrungTQ: Thêm mới bài đăng
   * */
  submitForm() {
    if (this.formGroup.invalid) {
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      this.formGroup.value.email = this.idInfoTopic.teacher.email;
      this.formGroup.value.processDetailId = this.idInfoTopic.id;
      this.formGroup.value.teacherId = this.idInfoTopic.teacher.id;
      this.commentPostService.saveComment(this.formGroup.value).subscribe(data => {
        if (data != null) {
          this.messageManager.showMessageCreateNotRole();
        } else {
          this.messageManager.showMessageCreatePostSuccess();
          setTimeout(() => {
            window.location.reload();
          }, 500)
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
