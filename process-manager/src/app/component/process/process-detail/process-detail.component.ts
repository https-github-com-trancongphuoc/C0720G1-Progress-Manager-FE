import {Component, OnInit} from '@angular/core';
import {ProcessService} from '../process.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../account/storage.service';
import {ICommentDTO} from '../../../dto/ICommentDTO';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit {

  processDetail: any;

  commentList: ICommentDTO[];

  commentListTemp: ICommentDTO[];

  idProcessDetail: number;

  accountPresent: any;

  page = 0;

  checkLoadComment = true;


  constructor(private processService: ProcessService,
              private route: ActivatedRoute,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.getAccountPresent();
    this.getProcessDetail();
  }

  getAccountPresent() {
    this.accountPresent = this.storageService.getUser();
    console.log(this.accountPresent);
  }

  getProcessDetail() {
    this.route.paramMap.subscribe(param => {
      this.idProcessDetail = Number(param.get('id'));

      this.processService.getProcessDetail(this.idProcessDetail).subscribe(data => {
        this.processDetail = data;
      });

      this.getListComment();
    });
  }

  getListComment() {
    this.processService.getListComment(this.idProcessDetail, this.page).subscribe(data => {
      this.commentList = data;

      for (let i = 0; i < this.commentList.length; i++) {
        this.commentList[i].toggle = false;
      }

      console.log(this.commentList);
    });
  }

  loadListComment() {
    this.processService.getListComment(this.idProcessDetail, this.page).subscribe(data => {
      this.commentListTemp = data;

        for (let i = 0; i < this.commentListTemp.length; i++) {
          this.commentList[i].toggle = false;
        }


        for (let i = 0; i < this.commentListTemp.length; i++) {
          this.commentList.push(this.commentListTemp[i]);
        }

        this.processService.getListComment(this.idProcessDetail, this.page + 1).subscribe(data2 => {
          if (data2.length == 0) {
            this.checkLoadComment = false;
          } else {
            return;
          }
        });

    });
  }

}
