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

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    this.getListProcess();
  }


  getListProcess() {
    this.processService.getListProcess().subscribe(data => {
      console.log(data);
      this.processList = data;
    });
  }

}
