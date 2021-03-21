import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../account.service";
import {LeaderGuard} from "../../common/gurad/leader.guard";

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.scss']
})
export class MyGroupComponent implements OnInit {

  idGroup: number;

  groupAccount: any;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.getIdGroup();
    this.getMemberInGroup();
  }

  getIdGroup() {
    this.route.paramMap.subscribe(data => {
      this.idGroup = Number(data.get('id'));
    });
  }

  getMemberInGroup() {
    this.accountService.getMemberInGroup(this.idGroup).subscribe(data => {
      console.log(data);
      this.groupAccount = data;
    })
  }





}
