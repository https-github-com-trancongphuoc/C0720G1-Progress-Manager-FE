import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IStudent, Student} from '../../../entity/IStudent';
import {StorageService} from "../../account/storage.service";
import {finalize} from "rxjs/operators";
import {IGroupAccount} from "../../../entity/IGroupAccount";
import {AccountService} from "../../account/account.service";


@Component({
  selector: 'app-register-group',
  templateUrl: './register-group.component.html',
  styleUrls: ['./register-group.component.scss']
})
export class RegisterGroupComponent implements OnInit {
  page = 0;
  pageable: any;
  listStudent: IStudent[];
  listStudentAdded: IStudent[] = [];
  student: IStudent;
  studentId: number;
  nameStudent = '';
  searchName: any;
  check = true;
  nameGroup: string;
  idGroup: number;
  checkLoading = false;

  constructor(public groupService: GroupService,
              private router: Router,
              private toastrService: ToastrService,
              private storage: StorageService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getListStudent();
  }

  getListStudent() {
    this.groupService.getListStudent(this.page).subscribe(data => {
      this.listStudent = data.content;
      this.pageable = data;
      this.checkLoading = true;
    });
  }

  addStudent(student: IStudent, index: number) {
    this.student = student;
    for (const val of this.listStudentAdded) {
      // tslint:disable-next-line:triple-equals
      if (JSON.stringify(val) === JSON.stringify(student)) {
        this.check = false;
      }
    }
    if (this.check) {
      this.listStudentAdded.push(student);
    }
    delete this.listStudent[index];
    this.listStudent = this.listStudent.filter((value => Student));
    this.registerComplete();
  }

  deleteStudentAdded(index: number, student: IStudent) {
    delete this.listStudentAdded[index];
    this.listStudent.push(student);
    this.listStudentAdded = this.listStudentAdded.filter((value => Student));
    this.deleteComplete();
  }

  getStudentId(student: IStudent, i: number) {
    this.studentId = i;
    this.nameStudent = student.name;
    this.student = student;
  }

  onSubmit() {
    // tslint:disable-next-line:triple-equals
    if (this.searchName == '') {
      this.getListStudent();
    } else {
      this.groupService.searchStudent(this.searchName, this.page).subscribe(data => {
        // @ts-ignore
        this.listStudent = data.content;
        this.pageable = data;
      });
    }
  }

  deleteComplete() {
    this.toastrService.warning('X??a sinh vi??n th??nh c??ng', 'Th??nh c??ng');
  }

  registerComplete() {
    this.toastrService.success('????ng k?? sinh vi??n th??nh c??ng', 'Th??nh c??ng');
  }

  createGroup(nameGroup: string) {
    if (this.storage.getUser().student == null) {
      this.groupService.createGroup(nameGroup, this.listStudentAdded,this.storage.getUser().id).subscribe(data => {
        this.groupService.getAll().subscribe(data1 =>{
          console.log(data1)
          this.router.navigateByUrl('group/' + data1)
          this.toastrService.success('????ng k?? nh??m th??nh c??ng', 'Th??nh c??ng');
        })
        setTimeout(function () {
          window.location.reload()
        }, 200)
      })
    } else {
      this.groupService.createGroupAndLeader(nameGroup, this.listStudentAdded, this.storage.getUser().id).subscribe(data => {
        this.groupService.getAll().subscribe(data1 =>{
          console.log(data1)
          this.toastrService.success('????ng k?? nh??m th??nh c??ng', 'Th??nh c??ng');
          this.router.navigateByUrl('group/' + data1)
        })
        setTimeout(function () {
          window.location.reload()
        }, 200)
      })
    }
  }
}
