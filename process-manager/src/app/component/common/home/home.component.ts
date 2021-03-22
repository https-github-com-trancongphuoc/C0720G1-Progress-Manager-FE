import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../account/storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accountPersent: any;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.getAccountPersent();
  }

  getAccountPersent() {
    this.accountPersent = this.storageService.getUser();
  }

}
