import {Component, OnInit} from '@angular/core';
import {ProcessService} from '../process.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../account/storage.service';
import {ICommentDTO} from '../../../dto/ICommentDTO';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit {

  processDetail: any;

  commentList: any;

  commentListTemp: any;

  idProcessDetail: number;

  accountPresent: any;

  page = 0;

  checkLoadComment = true;

  formAppreciate: FormGroup;

  checkLoading = false;


  constructor(private processService: ProcessService,
              private route: ActivatedRoute,
              private storageService: StorageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.checkLoading = false;
    this.getAccountPresent();
    this.getProcessDetail();

    this.formAppreciate = this.fb.group({
      content: [''],
      percentProcess: ['0'],
      idProcess: [],
      idProcessDetail: [],
      idAccount: [],
      studentList: []
    });
  }

  getIdProcessPresent() {
    for (let i = 0; i < this.processDetail.processList.length; i++) {
      if (!this.processDetail.processList[i].status) {
        this.formAppreciate.value.idProcess = this.processDetail.processList[i].id;
        break;
      }
    }
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

  appreciate() {

    if (this.formAppreciate.invalid) {

    } else {
      this.checkLoading = true;
      this.getIdProcessPresent();

      this.formAppreciate.value.idProcessDetail = this.idProcessDetail;
      this.formAppreciate.value.idAccount = this.accountPresent.id;
      this.formAppreciate.value.studentList = this.processDetail.groupAccount.studentList;

      this.processService.teacherAppreciate(this.formAppreciate.value).subscribe(data => {
        this.ngOnInit();
      });
      console.log(this.formAppreciate);
    }

  }
}
