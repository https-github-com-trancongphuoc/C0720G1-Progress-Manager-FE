import {Component, OnInit} from '@angular/core';
import {IStudent1} from '../../../entity/IStudent';
import {IGroupAccount} from '../../../entity/IGroupAccount';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from "../../account/storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TopicService} from "../../topic/topic.service";
import {WebSocketService} from "../../common/web-socket.service";
import {DateValidator} from "../../process/validatorDate.validator";

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnInit {
  page = 0;
  pageable: any;
  listGroup: IGroupAccount[];
  searchName: string;
  nameGroup = '';
  groupId = 0;
  check: boolean;
  listStudent: IStudent1[] = [];
  studentId = 0;
  nameStudent: string;
  listIdStudent: number[] = []

  groupValue: any;
  flagHidden = false;
  flagLoading = false;
  formGroup: FormGroup;

  validate_message = {
    'date': [
      {type: 'required', message: 'Nội dung không được để trống!'},
      {type: 'dateValid', message: 'Ngày chọn không trước ngày hôm nay'}
    ]
  }

  constructor(public groupService: GroupService,
              private router: Router,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private topicService: TopicService,
              private webSocketService: WebSocketService,
              private storage: StorageService) {
  }

  ngOnInit(): void {
    this.getListGroup();
    this.createDeadline();
  }

  getListGroup() {
    this.groupService.getListGroup(this.page).subscribe(data => {
      this.listGroup = data.content;
      this.pageable = data;
      this.listGroup.forEach(value => {
        value.quantity = value.studentList.length;
      });
    });
  }

  onSubmit(listStudent: IStudent1[]) {
    for (let i = 0; i < listStudent.length; i++) {
      this.listIdStudent[i] = this.listStudent[i].id
    }

    this.groupService.deleteGroup(this.groupId, this.listIdStudent).subscribe(data => {
      this.toastrService.warning('Xóa nhóm thành công', 'Thành công');
      this.ngOnInit();
    });
  }


  getNameGroup(name: string, id: number) {
    this.nameGroup = name;
    this.groupId = id;
  }

  openComponent(id: number, name: string) {
    this.studentId = id;
    this.nameStudent = name;
    document.getElementById('showStudent').style.visibility = 'hidden';
  }

  closeComponent() {
    document.getElementById('showStudent').style.visibility = 'visible';
  }

  getListStudent(id: number) {
    this.groupService.getListStudentByIdGroup(id).subscribe(data => {
      this.groupId = id;
      this.listStudent = data;
    });
  }

  deleteStudentGroup(id: number) {
    this.groupService.deleteStudentGroup(id).subscribe(data => {
      document.getElementById('showStudent').style.visibility = 'visible';
      this.getListStudent(this.groupId);
      this.getListGroup();
      this.toastrService.warning('Xóa sinh viên thành công', 'Thành công');
    });
  }

  acceptGroup(groupId: number) {
    this.groupService.acceptGroup(groupId).subscribe(data => {
      this.getListGroup();
      this.toastrService.success('Duyệt nhóm thành công', 'Thành công');
    });
  }

  searchGroup() {
    if (this.searchName == '') {
      this.getListGroup();
    } else {
      this.groupService.searchGroup(this.searchName, this.page).subscribe(data => {
        this.listGroup = data.content;
        this.pageable = data;
        this.listGroup.forEach(value => {
          value.quantity = value.studentList.length;
        });
      });
    }
  }

  getValue(group: IGroupAccount) {
    this.groupValue = group;
    this.flagHidden = true;
  }

  createDeadline() {
    this.formGroup = this.formBuilder.group({
      date: ['', [Validators.required, DateValidator]]
    })
  }

  ngSubmitForm() {
    this.flagLoading = true;
    this.formGroup.value.teacherId = this.storage.getUser().id;
    this.formGroup.value.studentList = this.groupValue.studentList;
    this.formGroup.value.id = this.groupValue.id;
    this.topicService.getDeadline(this.formGroup.value).subscribe(data =>{
      this.toastrService.success('Cập nhật thành công hạn chót nộp thông tin sơ lươc về dự án')
      this.webSocketService.callServer().subscribe();
      this.ngOnInit();
      this.flagHidden = false;
    })
  }

  exitDeadline() {
    this.flagHidden = false;
  }
}
