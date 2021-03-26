import {Component, OnInit} from '@angular/core';
import {ProcessService} from '../process.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../account/storage.service';
import {ICommentDTO} from '../../../dto/ICommentDTO';
import {FormBuilder, FormGroup} from "@angular/forms";
import {isEmpty} from "rxjs/operators";
import {NotificationService} from "../../common/notification.service";
import {WebSocketService} from "../../common/web-socket.service";

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit {

  processDetail: any;

  commentList: any;

  commentListTemp: any;

  commentListTempTemp: any;

  idProcessDetail: number;

  accountPresent: any;

  page = 0;

  checkLoadComment = true;

  formAppreciate: FormGroup;

  checkLoading = false;

  check = false;

  toggleEditAppreciate = false;

  idAppreciate : number;

  appreciateWantDelete: any;

  formEditAppreciate: FormGroup;

  idProcessPersent: number;

  pageable: any;


  constructor(private processService: ProcessService,
              private route: ActivatedRoute,
              private storageService: StorageService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.checkLoading = false;
    this.toggleEditAppreciate = false;
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


    this.formEditAppreciate = this.fb.group({
      id: [],
      account: [],
      content: [],
      deleteFlag: [],
      replyComment: [],
      timeComment: [],
      title: [],
      status: [],
      topicProcess: []
    })

  }

  getIdProcessPresent() {
    for (let i = 0; i < this.processDetail.processList.length; i++) {
      if (!this.processDetail.processList[i].status) {
        this.idProcessPersent = this.processDetail.processList[i].id;
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

      this.check = true;

      for (let i = 0; i < this.commentList.length; i++) {
        this.commentList[i].toggle = false;
      }

      console.log(this.commentList);
    });
  }

  loadListComment() {
    console.log(this.checkLoadComment);
    this.processService.getListComment(this.idProcessDetail, this.page).subscribe(data => {
      this.commentListTemp = data;

        for (let i = 0; i < this.commentListTemp.length; i++) {
          this.commentList[i].toggle = false;
        }


        for (let i = 0; i < this.commentListTemp.length; i++) {
          this.commentList.push(this.commentListTemp[i]);
        }

        this.processService.getListComment(this.idProcessDetail, this.page + 1).subscribe(() => {

        }, error => {
            this.checkLoadComment = false;
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
      this.formAppreciate.value.idProcess = this.idProcessPersent;

      this.processService.teacherAppreciate(this.formAppreciate.value).subscribe(data => {
        this.ngOnInit();
        this.webSocketService.callServer().subscribe();
        // this.commentList.push(data);
        // this.formAppreciate.reset();
        // this.checkLoading = false;
      });
    }

  }

  editAppreciate(e: any) {
    console.log(e);
    this.formEditAppreciate.patchValue(e);
    this.toggleEditAppreciate = true;
    this.idAppreciate = e.id
  }

  submitEditAppreciate() {
    console.log(this.formEditAppreciate);

    if (this.formEditAppreciate.invalid) {

    } else {

      this.processService.editAppreciate(this.formEditAppreciate.value).subscribe(data => {
        this.toggleEditAppreciate = false;


        for (let i = 0; i < this.commentList.length; i++) {
          if (this.commentList[i].id == this.formEditAppreciate.value.id) {
            this.formEditAppreciate.value.replyCommentList = this.commentList[i].replyCommentList;
            this.commentList[i] = this.formEditAppreciate.value;
          }
        }


        this.formEditAppreciate.reset();
        console.log(this.commentList);
      }, error => {

      })
    }
  }

  toggleModalDeleteAppreciate(e: any) {
    this.appreciateWantDelete = e;
  }

  deleteAppreciate() {

    this.processService.deleteAppreciate(this.appreciateWantDelete).subscribe(data => {
      console.log(this.commentList);
      for (let i = 0; i < this.commentList.length; i++) {

        if (this.commentList[i].replyCommentList != null) {
          for (let j = 0; j < this.commentList[i].replyCommentList.length; j++) {
            if (this.commentList[i].replyCommentList[j].id == this.appreciateWantDelete.id) {
              this.commentList[i].replyCommentList.splice(j,1);
            }
          }
        }

        if (this.commentList[i].id == this.appreciateWantDelete.id) {
          this.commentList.splice(i,1);
        }
      }
    });
  }

  replyAppreciate(comment: any) {

    // this.notificationService.notification(comment);

    if (this.formEditAppreciate.invalid) {

    } else {
      for (let i = 0; i < this.processDetail.processList.length; i++) {
        if (!this.processDetail.processList[i].status) {
          this.formEditAppreciate.value.topicProcess = this.processDetail.processList[i];
          break;
        }
      }
      this.formEditAppreciate.value.replyComment = comment;
      this.formEditAppreciate.value.account = this.accountPresent;


      this.processService.replyAppreciate(this.formEditAppreciate.value, this.idProcessDetail).subscribe(data => {
        for (let i = 0; i < this.commentList.length; i++) {
          if (this.commentList[i].id == comment.id) {
            this.commentList[i].replyCommentList.push(data);
          }
        }


        this.formEditAppreciate.reset();
        this.webSocketService.callServer().subscribe();
      })
    }
  }

  checkIsEmpty(value: any) {
    isEmpty()
  }
}
