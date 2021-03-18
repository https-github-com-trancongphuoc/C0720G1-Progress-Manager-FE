import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from '../../account/storage.service';
import {ProcessService} from "../../process/process.service";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  checkLogin = false;

  notificationList: any;

  accountPresent: any;

  checkSeen = false;

  checkLoad = false;

  processDetail: any;

  constructor(private storageService: StorageService,
              private processService: ProcessService,
              private toast: ToastrService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAccountPresent();
    this.checkLogin = !!this.accountPresent;
    if (this.checkLogin) {
      this.getNotification();
      this.getProcessDetailByGroupId();
    }
  }

  getProcessDetailByGroupId() {
    if (this.accountPresent.student != null) {
      if (this.accountPresent.student.groupAccount != null) {
        this.processService.getProcessDetailByGroupId(this.accountPresent.student.groupAccount.id).subscribe(data => {
          this.processDetail = data;
          console.log(this.processDetail);
        })
      }
    }
  }

  getAccountPresent() {
    this.accountPresent = this.storageService.getUser();
    console.log(this.accountPresent);
  }

  ngDoCheck(): void {

  }

  signOut() {
    this.storageService.signOut();
    this.ngOnInit();
  }

  getNotification() {
    this.notificationService.getAllNotification(this.accountPresent.id).subscribe(data => {
      this.notificationList = data.content;
      console.log(this.notificationList);
      this.checkLoad = true;
      for (let i = 0; i < this.notificationList.length; i++) {
        if (!this.notificationList[i].status) {
          this.checkSeen = true;
        }
      }
    });
  }

  seen() {
    if (this.checkSeen) {
      this.notificationService.seenNotification(this.accountPresent.id).subscribe(data => {
        this.ngOnInit();
        this.checkSeen = false;
      });
    }

  }
}
