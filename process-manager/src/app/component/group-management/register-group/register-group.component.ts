import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IStudent, Student} from '../../../entity/IStudent';

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

  constructor(public groupService: GroupService,
              private router: Router,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getListStudent();
  }

  getListStudent() {
    this.groupService.getListStudent(this.page).subscribe(data => {
      console.log(data);
      this.listStudent = data.content;
      this.pageable = data;
    });
  }

  addStudent(student: IStudent, index: number) {
    this.student = student;
    this.listStudentAdded.push(student);
    delete this.listStudent[index];
    this.listStudent = this.listStudent.filter((value => Student));
  }

  deleteStudentAdded(index: number, student: IStudent) {
    delete this.listStudentAdded[index];
    this.listStudent.push(student);
    this.listStudentAdded = this.listStudentAdded.filter((value =>  Student));
    console.log(this.listStudentAdded);
  }

  getStudentId(student: IStudent, i: number) {
    this.studentId = i;
    this.nameStudent = student.name;
  }
}
