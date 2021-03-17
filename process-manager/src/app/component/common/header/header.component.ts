import {Component, DoCheck, OnInit} from '@angular/core';
import {StorageService} from '../../account/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  checkLogin = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.checkLogin = !!this.storageService.getUser();
  }

  signOut() {
    this.storageService.signOut();
  }
}
