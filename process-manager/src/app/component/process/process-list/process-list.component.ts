import { Component, OnInit } from '@angular/core';
import {ProcessService} from '../process.service';
import {IInfoTopicRegister} from '../../../entity/IInfoTopicRegister';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {

  processList: any;

  pageable: any;

  page = 0;

  checkLoad = false;

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    this.getListProcess();
  }

  parseInt(value: number) {
    return Number(value);
  }


  getListProcess() {
    this.page = Number(this.page);

    this.processService.getListProcess(this.page).subscribe(data => {
      console.log(data);
      this.pageable = data;
      this.processList = data.content;

      for (let i = 0; i < this.processList.length; i++) {
        for (let j = 0; j < this.processList.length; j++) {
          if (this.processList[i].groupAccount.name != null) {
            console.log(1);
            break;
          } else {
            if (this.processList[i].groupAccount == this.processList[j].groupAccount.id) {
              this.processList[i].groupAccount = this.processList[j].groupAccount;
              console.log(2);
              break;
            }
          }
        }
      }


      this.checkLoad = true;
    });
  }

}
