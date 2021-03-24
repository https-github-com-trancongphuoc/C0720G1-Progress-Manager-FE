import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IStudent, Student} from '../../../entity/IStudent';
import {StorageService} from "../../account/storage.service";


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

  constructor(public groupService: GroupService,
              private router: Router,
              private toastrService: ToastrService,
              private storage: StorageService) {
  }

  ngOnInit(): void {
    this.getListStudent();
  }

  getListStudent() {
    this.groupService.getListStudent(this.page).subscribe(data => {
      this.listStudent = data.content;
      this.pageable = data;
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
    this.toastrService.warning('Xóa sinh viên thành công', 'Thành công');
  }

  registerComplete() {
    this.toastrService.success('Đăng ký sinh viên thành công', 'Thành công');
  }

  createGroup(nameGroup: string) {
    if (this.storage.getUser().student == null) {
      this.groupService.createGroup(nameGroup, this.listStudentAdded).subscribe(data => {
        this.toastrService.success('Đăng ký nhóm thành công', 'Thành công');
        this.router.navigateByUrl('')
        setTimeout(function () {
          window.location.reload()
        }, 200)
      })
    } else {
      this.groupService.createGroupAndLeader(nameGroup, this.listStudentAdded, this.storage.getUser().id).subscribe(data => {
        this.toastrService.success('Đăng ký nhóm thành công', 'Thành công');
        this.router.navigateByUrl('')
        setTimeout(function () {
          window.location.reload()
        }, 200)
      })
    }
  }
}
