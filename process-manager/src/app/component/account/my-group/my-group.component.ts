import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../account.service";
import {LeaderGuard} from "../../common/gurad/leader.guard";
import {StorageService} from "../storage.service";
import {GroupService} from "../../group-management/group.service";
import {ICheckJoinGroup} from "../../../entity/ICheckJoinGroup";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.scss']
})
export class MyGroupComponent implements OnInit {

  idGroup: number;

  groupAccount: any;

  checkStatusComplete = true;
  private accountPresent: any;
  check: boolean;
  nameGroup: string
  studentId = 0;
  checkJoin: any;
  accountGroupId = null;
  statusJoin = false;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private storage: StorageService,
              private groupService: GroupService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getIdGroup();
    this.getMemberInGroup();
    this.checkGroup()
    this.studentId = this.storage.getUser().student.id;
  }

  getIdGroup() {
    this.route.paramMap.subscribe(data => {
      this.idGroup = Number(data.get('id'));
    });
  }

  getMemberInGroup() {
    this.accountService.getMemberInGroup(this.idGroup).subscribe(data => {
      this.groupAccount = data;

      for (let i = 0; i < this.groupAccount.infoTopicRegisterList.length; i++) {
        if (!this.groupAccount.infoTopicRegisterList[i].statusComplete) {
          this.checkStatusComplete = false;
        }
      }

      console.log(this.groupAccount);
    })
  }

  checkGroup() {
    this.accountPresent = this.storage.getUser();
    this.groupService.checkJoinGroup(this.accountPresent.student.id).subscribe(data => {
      this.nameGroup = this.storage.getUser().student.groupAccount.name
      console.log(data)
      // @ts-ignore
      this.accountGroupId = data.groupAccountId;
      // @ts-ignore
      this.statusJoin = data.statusJoin;
      console.log(this.checkJoin)
    })
  }

  JoinGroup(id: any) {
    this.groupService.acceptJoinGroup(id).subscribe(data => {
      this.toastrService.success('Tham gia nhóm thành công', 'Thành công');
      window.location.reload()
    })
  }

  DenyGroup(id: any) {
    this.groupService.denyGroup(id).subscribe(data => {
      this.toastrService.warning('Từ chối nhóm thành công', 'Thành công');
      window.location.reload()
    })
  }

}
