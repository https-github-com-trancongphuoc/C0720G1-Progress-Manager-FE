import { Component, OnInit } from '@angular/core';
import {ITeacher} from '../../../entity/ITeacher';
import {TeacherService} from '../teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  listTeacher: ITeacher[] = [];
  public pageable: any;
  public page = 0;
  public find: string = '';
  idTeacher: number;
  nameTeacher: string;
  avatarNull: string = "https://firebasestorage.googleapis.com/v0/b/vaccination-manager.appspot.com/o/trainer-2.jpg?alt=media&token=0c5c2877-85b4-4f32-bc95-02743283219e";
  constructor(private teacherService : TeacherService) {
    this.getAllTeacher();
  }

  ngOnInit(): void {
  }

  getAllTeacher(){
    if (!Number(this.page) || Number(this.page) <0 ){
      this.page = 0;
    }
    this.teacherService.getAllTeacher(this.find, this.page).subscribe(data =>{

      // @ts-ignore
      this.listTeacher = data.content;
      console.log("aaaaaaaaaaa")
      console.log(data.content);
      this.pageable = data;
    })
  }

  getTeacher(teacher: ITeacher) {
    this.idTeacher = teacher.id;
    this.nameTeacher = teacher.name;
  }

  deleteTeacher() {
    console.log(this.idTeacher);
    this.teacherService.deleteTeacher(this.idTeacher).subscribe(data =>{
      this.getAllTeacher();
    });
  }
}
