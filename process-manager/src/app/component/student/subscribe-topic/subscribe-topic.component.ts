import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../account/storage.service";
import {ProcessService} from "../../process/process.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-subscribe-topic',
  templateUrl: './subscribe-topic.component.html',
  styleUrls: ['./subscribe-topic.component.css']
})
export class SubscribeTopicComponent implements OnInit {

  formInfoTopicRegister: FormGroup;

  topicList: any;

  checkReadOnly = false;

  accountPercent: any;

  idTopicSelected: any;

  checkLoading = false;

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private processService: ProcessService,
              private router: Router,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.getAccountPercent();

    this.getListTopic();
  }

  getAccountPercent() {
    this.accountPercent = this.storageService.getUser();

    if (this.accountPercent.student != null) {
      // this.topicList = this.accountPercent.student.grade.faculty.topicList;
      this.formInfoTopicRegister = this.fb.group({
        topic: new FormGroup({
          id: new FormControl(''),
          name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
          content: new FormControl('',[Validators.required, Validators.maxLength(1000)]),
          faculty: new FormControl(this.accountPercent.student.grade.faculty)
        }),
        groupAccount: [this.accountPercent.student.groupAccount]
      });
    } else {
      this.topicList = this.accountPercent.teacher.faculty.topicList;
      this.formInfoTopicRegister = this.fb.group({
        topic: new FormGroup({
          id: new FormControl(''),
          name: new FormControl('',[Validators.required, Validators.maxLength(100)]),
          content: new FormControl('',[Validators.required, Validators.maxLength(1000)])
        }),
        groupAccount: ['']
      });
    }
    console.log(this.accountPercent);
  }


  getListTopic() {
    this.processService.getListTopic(this.accountPercent.student.grade.faculty.id).subscribe(data => {
      this.topicList = data;
      this.checkLoading = true;
    });
  }

  selectTopic(e: any) {
    this.idTopicSelected = e.id;
    this.checkReadOnly = true;

    let obj = {
      topic: e,
      groupAccount: this.accountPercent.student.groupAccount
    };

    this.formInfoTopicRegister.patchValue(obj);


    // this.formInfoTopicRegister = this.fb.group({
    //   topic: new FormGroup({
    //     id: new FormControl(e.id),
    //     name: new FormControl(e.name),
    //     content: new FormControl(e.content)
    //   }),
    //   groupAccount: [this.accountPercent.student.groupAccount]
    // });
  }

  closeSelect() {
    this.formInfoTopicRegister.reset();
    this.idTopicSelected = '';
    this.checkReadOnly = false;
    // this.ngOnInit();
  }

  save() {
    console.log(this.formInfoTopicRegister);

    if (this.formInfoTopicRegister.invalid) {
      return;
    }

    this.processService.registerTopic(this.formInfoTopicRegister.value).subscribe(data => {
      this.toast.success('Đăng ký thành công');
      this.router.navigate(['/group',this.accountPercent.student.groupAccount.id])
    })
  }
}
