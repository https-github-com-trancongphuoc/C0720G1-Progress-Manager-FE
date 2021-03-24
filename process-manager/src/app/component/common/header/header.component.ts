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

  countNotification = 0;
  check = false;
  checkStudentExistGroup = false;

  constructor(private storageService: StorageService,
              private processService: ProcessService,
              private toast: ToastrService,
              private notificationService: NotificationService) {
  }

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
        })
      }
    }
  }

  getAccountPresent() {
    this.accountPresent = this.storageService.getUser();
    this.accountPresent.accountRoleList.forEach(value => {
      this.check = (value.role.name == 'Admin') || (value.role.name == 'Giảng viên');
    })
    if (this.accountPresent.student == null) {
      this.checkStudentExistGroup = false;
    }
    if (this.accountPresent.student.groupAcount != null) {
      this.checkStudentExistGroup = false;
    }
    if (this.accountPresent.student.groupAccount == null) {
      this.checkStudentExistGroup = true;
    }

    console.log(this.accountPresent)
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
      this.checkLoad = true;
      for (let i = 0; i < this.notificationList.length; i++) {
        if (!this.notificationList[i].status) {
          this.checkSeen = true;
          this.countNotification++;
        }
      }

      if (this.checkSeen) {
        this.toast.warning('Bạn có ' + this.countNotification + ' thông báo', 'Thông báo');
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
