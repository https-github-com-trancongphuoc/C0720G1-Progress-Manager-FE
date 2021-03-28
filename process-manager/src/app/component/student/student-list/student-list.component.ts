import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import {IStudent} from '../../../entity/IStudent';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  public find: string = '';
  public listStudent: IStudent[] = [];
  public pageable: any;
  public page = 0;
  idStudent: number;
  nameStudent: string;
  constructor(private studentService : StudentService,
              private router: Router,) {
    this.getAllStudent();
  }

  ngOnInit(): void {
  }

  getAllStudent(){
    if (!Number(this.page) || Number(this.page) <0 ){
      this.page = 0;
    }
    console.log(this.find);
    this.studentService.getAllStudent(this.find,this.page).subscribe(data =>{
      console.log(data);
      // @ts-ignore
      this.listStudent = data.content;
      this.pageable = data;
    })
  }

  /** change code id*/
  getCode(id: number, size: number): string {
    let num = id.toString();
    while (num.length < size) {
      num = '0' + num;
    }
    return 'MSV-' + num;
  }

  getStudent(student: IStudent) {
    this.idStudent = student.id;
    this.nameStudent = student.name;
  }

  deleteStudent() {
    console.log(this.idStudent);
    this.studentService.deleteStudent(this.idStudent).subscribe(data =>{
      this.getAllStudent();
    });
  }
}
