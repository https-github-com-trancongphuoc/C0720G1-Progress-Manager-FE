import {Component, OnInit} from '@angular/core';
import {IStudent1} from '../../../entity/IStudent';
import {IGroupAccount} from '../../../entity/IGroupAccount';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {StorageService} from "../../account/storage.service";

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

  constructor(public groupService: GroupService,
              private router: Router,
              private toastrService: ToastrService,
              private storage : StorageService) {
  }

  ngOnInit(): void {
    this.getListGroup();
  }

  getListGroup() {
    this.groupService.getListGroup(this.page).subscribe(data => {
      // @ts-ignore
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
    // tslint:disable-next-line:triple-equals
    if (this.searchName == '') {
      this.getListGroup();
    } else {
      this.groupService.searchGroup(this.searchName, this.page).subscribe(data => {
        // @ts-ignore
        this.listGroup = data.content;
        this.pageable = data;
        this.listGroup.forEach(value => {
          value.quantity = value.studentList.length;
        });
      });
    }
  }
}
