import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from '../../account/storage.service';
import {ProcessService} from "../../process/process.service";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../notification.service";
import {WebSocketService} from "../web-socket.service";
import {GroupService} from "../../group-management/group.service";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  checkLogin = false;

  notificationList: any;

  accountPercent: any;

  checkSeen = false;

  checkLoad = false;

  processDetail: any;

  countNotification = 0;

  check = false;

  checkStudentExistGroup = false;

  constructor(private storageService: StorageService,
              private processService: ProcessService,
              private toast: ToastrService,
              private notificationService: NotificationService,
              private webSocketService: WebSocketService,
              private groupService: GroupService,
              private accountService: AccountService) {

    // Open connection with server socket
    let stompClient = this.webSocketService.connect();
    // stompClient.connect();
    stompClient.connect({}, frame => {
      console.log(frame);
      // Subscribe to notification topic
      stompClient.subscribe('/topic/notification', notifications => {
        // Update notifications attribute with the recent messsage sent from the server
        this.ngOnInit();
      })
    });
  }

  ngOnInit(): void {
    this.countNotification = 0;
    this.getAccountPresent();
    this.checkLogin = !!this.accountPercent;
    if (this.checkLogin) {
      this.getNotification();
      this.getProcessDetailByGroupId();
    }
  }

  getProcessDetailByGroupId() {
    if (this.accountPercent.student != null) {
      if (this.accountPercent.student.groupAccount != null) {
        this.processService.getProcessDetailByGroupId(this.accountPercent.student.groupAccount.id).subscribe(data => {
          this.processDetail = data;
        })
      }
    }
  }

  getAccountPresent() {
    this.accountPercent = this.storageService.getUser();
    this.accountPercent.accountRoleList.forEach(value => {
      this.check = (value.role.name == 'ROLE_ADMIN') || (value.role.name == 'ROLE_TEACHER');
    });

    if (this.accountPercent.student == null) {
      this.checkStudentExistGroup = false;
    }
    if (this.accountPercent.student?.groupAcount != null) {
      this.checkStudentExistGroup = false;
    }
    if (this.accountPercent.student?.groupAccount == null) {
      this.checkStudentExistGroup = true;
    }

    console.log(this.accountPercent)
  }

  signOut() {
    this.storageService.signOut();
    this.ngOnInit();
  }

  getNotification() {
    this.notificationService.getAllNotification(this.accountPercent.id).subscribe(data => {
      console.log(data);
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
      this.notificationService.seenNotification(this.accountPercent.id).subscribe(data => {
        this.ngOnInit();
        this.checkSeen = false;
      });
    }
  }


  JoinGroup() {
    this.groupService.acceptJoinGroup(this.accountPercent.student?.id).subscribe(data => {
      this.toast.success('Tham gia nhóm thành công', 'Thành công');

      this.accountService.login(this.accountPercent).subscribe(data => {
        this.storageService.saveUserLocal(data.account);
        this.ngOnInit();
      });
    })
  }


  DenyGroup(id: any) {
    this.groupService.denyGroup(id).subscribe(data => {
      this.toast.warning('Từ chối nhóm thành công', 'Thành công');
      this.accountService.login(this.accountPercent).subscribe(data => {
        this.storageService.saveUserLocal(data.account);
        this.ngOnInit();
      });
    })
  }
}
