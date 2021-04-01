import {Component, OnInit} from '@angular/core';
import {ProcessService} from "../process.service";
import {StorageService} from "../../account/storage.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {patchTimer} from "zone.js/lib/common/timers";
import {TopicService} from "../../topic/topic.service";
import {IInfoTopicRegister} from "../../../entity/IInfoTopicRegister";

@Component({
  selector: 'app-approval-topic',
  templateUrl: './approval-topic.component.html',
  styleUrls: ['./approval-topic.component.scss']
})
export class ApprovalTopicComponent implements OnInit {

  accountPercent: any;

  infoTopicRegisterList: any;

  pageable: any;

  infoTopicWantApproval: any;

  page = 0;

  checkLoading = false;

  checkEmpty = false;

  formGroup: FormGroup;
  content: string;
  url: string;
  public info: any;
  flagLoading = false;
  flagHidden = false;
  validate_message = {
    'content' : [
      {type: 'required', message: 'Nội dung không được để trống!'},
      {type: 'maxlength', message: 'Không nhập nội dung quá dài!'},
    ]
  }

  constructor(private processService: ProcessService,
              private storageService: StorageService,
              private formBuilder: FormBuilder,
              private topicService: TopicService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAccountPercent();
    this.getListInfoTopicRegister();
    this.createMessageCancel();
    console.log(this.infoTopicWantApproval);
  }

  parseInt(value: any) {
    return Number(value);
  }

  getAccountPercent() {
    this.accountPercent = this.storageService.getUser();
    console.log(this.accountPercent);
  }

  getListInfoTopicRegister() {
    this.processService.getListInfoTopicRegister(this.accountPercent.teacher.faculty.id).subscribe(data => {
      this.pageable = data;
      this.infoTopicRegisterList = data.content;
      console.log(this.infoTopicRegisterList);

      this.checkLoading = true;
    }, error => {
      this.checkLoading = true;
      this.checkEmpty = true;
    });
  }

  approval() {
    this.infoTopicWantApproval.teacher = this.accountPercent.teacher;
    this.processService.approval(this.infoTopicWantApproval).subscribe(data => {
      this.toast.success('Phê duyệt thành công')
      this.ngOnInit();
    })
  }

  getValue(e: any) {
    this.info = e
    this.flagHidden = true;
  }

  createMessageCancel() {
    this.formGroup = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(200)]]
    })
  }
  ngSubmitForm() {
    this.flagHidden = false;
    this.formGroup.value.studentList = this.info.groupAccount.studentList;
    this.formGroup.value.topicId = this.info.topic.id;
    this.formGroup.value.id = this.info.id;
    this.topicService.getDelete(this.formGroup.value).subscribe(data => {
      this.toast.success('Thành công hủy dự án')
      this.ngOnInit();
    });
  }

  exitReply() {
    this.flagHidden = false;
  }
}
