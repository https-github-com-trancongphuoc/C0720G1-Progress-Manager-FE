import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {StorageService} from "../../account/storage.service";
import {ProcessService} from "../../process/process.service";
import {Router} from "@angular/router";

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

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private processService: ProcessService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAccountPercent();


  }

  getAccountPercent() {
    this.accountPercent = this.storageService.getUser();
    if (this.accountPercent.student != null) {
      this.topicList = this.accountPercent.student.grade.faculty.topicList;
      this.formInfoTopicRegister = this.fb.group({
        topic: new FormGroup({
          id: new FormControl(''),
          name: new FormControl(''),
          content: new FormControl(''),
          faculty: new FormControl(this.accountPercent.student.grade.faculty)
        }),
        groupAccount: [this.accountPercent.student.groupAccount]
      });
    } else {
      this.topicList = this.accountPercent.teacher.faculty.topicList;
      this.formInfoTopicRegister = this.fb.group({
        topic: new FormGroup({
          id: new FormControl(''),
          name: new FormControl(''),
          content: new FormControl('')
        }),
        groupAccount: ['']
      });
    }
    console.log(this.accountPercent);
  }

  selectTopic(e: any) {
    this.idTopicSelected = e.id;
    this.checkReadOnly = true;

    this.formInfoTopicRegister = this.fb.group({
      topic: new FormGroup({
        id: new FormControl(e.id),
        name: new FormControl(e.name),
        content: new FormControl(e.content)
      }),
      groupAccount: [this.accountPercent.student.groupAccount]
    });
  }

  closeSelect() {
    this.formInfoTopicRegister.reset();
    this.idTopicSelected = '';
    this.checkReadOnly = false;
  }

  save() {
    console.log(this.formInfoTopicRegister);

    this.processService.registerTopic(this.formInfoTopicRegister.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/group',this.accountPercent.student.groupAccount.id])
    })
  }
}
