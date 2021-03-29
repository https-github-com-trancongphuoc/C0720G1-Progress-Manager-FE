import { Component, OnInit } from '@angular/core';
import {ProcessService} from "../process.service";
import {StorageService} from "../../account/storage.service";
import {ToastrService} from "ngx-toastr";

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



  constructor(private processService: ProcessService,
              private storageService: StorageService,
              private toast: ToastrService) { }

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
}
