import {Component, DoCheck} from '@angular/core';
import {StorageService} from './component/account/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'process-manager';

  check = true;

  accountPercent: any;

  statusJoin = false;

  constructor(private storageService: StorageService) {
    this.getAccountPercent();
  }

  ngDoCheck(): void {
    // this.check = this.storageService.getUser() != null;
  }

  getAccountPercent() {
    this.accountPercent = this.storageService.getUser();
  }


}
