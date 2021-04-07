import {Component, OnInit} from '@angular/core';
import {ProcessService} from "../process.service";
import {StorageService} from "../../account/storage.service";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TopicService} from "../../topic/topic.service";
import {WebSocketService} from "../../common/web-socket.service";
import {DateSearchValidator, DateValidator} from "../validatorDate.validator";

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

  idInfo: number;
  formGroup: FormGroup;
  formGroupCancel: FormGroup;
  formArray: FormArray;
  content: string;
  url: string;
  public info: any;
  flagLoading = false;
  flagHiddenCancel = false;
  flagHiddenApproval = false;
  messageTime: string = 'Thời gian kết thúc phải sau thời gian bắt đầu!';
  validate_message = {
    'messageCancel': [
      {type: 'required', message: 'Nội dung không được để trống!'},
      {type: 'maxlength', message: 'Không nhập nội dung quá dài!'},
    ],
    processList: {
      dateStart: [
        {type: 'required', message: 'Ngày bắt đầu không được để trống!'},
        {type: 'dateValid', message: 'Ngày chọn không trước ngày hôm nay'}
      ],
      dateEnd:[
        {type: 'required', message: 'Ngày kết thúc không được để trống!'},
        {type: 'dateValid', message: 'Ngày chọn không trước ngày hôm nay'}
      ],
    }
  }

  constructor(private processService: ProcessService,
              private storageService: StorageService,
              private formBuilder: FormBuilder,
              private topicService: TopicService,
              private webSocketService: WebSocketService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getAccountPercent();
    this.getListInfoTopicRegister();
    this.createMessageCancel();
    this.createTopicProcess();
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
    this.info = e;
    this.flagHiddenCancel = true;
    this.flagHiddenApproval = false;
  }

  createMessageCancel() {
    this.formGroupCancel = this.formBuilder.group({
      messageCancel: ['', [Validators.required, Validators.maxLength(200)]]
    })
  }

  ngSubmitForm() {
    this.flagLoading = true;
    this.formGroupCancel.value.studentList = this.info.groupAccount.studentList;
    this.formGroupCancel.value.topicId = this.info.topic.id;
    this.formGroupCancel.value.teacher = this.storageService.getUser();
    this.formGroupCancel.value.id = this.info.id;
    this.topicService.getDelete(this.formGroupCancel.value).subscribe(data => {
      this.toast.success('Thành công hủy dự án')
      this.webSocketService.callServer().subscribe();
      this.ngOnInit();
      this.flagHiddenCancel = false;
    });
  }

  exitReply() {
    this.flagHiddenCancel = false;
  }

  getValueInfo(e: any) {
    this.info = e;
    console.log(this.info)
    this.idInfo = this.info.id;
    this.flagHiddenApproval = true;
    this.flagHiddenCancel = false;
  }

  createArray(): FormGroup {
    return this.formBuilder.group({
      dateStart: ['', [Validators.required, DateValidator]],
      dateEnd: ['', [Validators.required, DateValidator]],
      processNumber: ['', [Validators.required]],
      infoTopicRegister: ['', [Validators.required]],
    })
  }

  createTopicProcess() {
    this.formGroup = this.formBuilder.group({
      topicProcessList: this.formBuilder.array([this.createArray()])
    })
  }

  addArray(): void {
    this.formArray = this.formGroup.get('topicProcessList') as FormArray;
    this.formArray.push(this.createArray())
  }

  ngSubmitArray() {
    this.flagLoading = true;
    this.formGroup.value.teacher =  this.accountPercent.teacher;
    this.topicService.createTopicProcess(this.formGroup.value).subscribe(data => {
      this.toast.success('Duyệt dự án thành công')
      this.webSocketService.callServer().subscribe();
      this.ngOnInit();
      this.flagHiddenApproval = false;
    });
  }
}
