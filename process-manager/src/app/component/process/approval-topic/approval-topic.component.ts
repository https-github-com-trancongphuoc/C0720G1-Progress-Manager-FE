import { Component, OnInit } from '@angular/core';
import {ProcessService} from "../process.service";
import {StorageService} from "../../account/storage.service";

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



  constructor(private processService: ProcessService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.getAccountPercent();
    this.getListInfoTopicRegister();
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
    })
  }

  approval() {
    this.infoTopicWantApproval.teacher = this.accountPercent.teacher;
    this.processService.approval(this.infoTopicWantApproval).subscribe(data => {
      this.ngOnInit();
    })

  }
}
