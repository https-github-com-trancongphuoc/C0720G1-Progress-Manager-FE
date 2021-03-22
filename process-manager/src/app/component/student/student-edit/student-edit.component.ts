import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StudentService} from '../student.service';
import {IStudent} from '../../../entity/IStudent';
import {FormControl, FormGroup} from '@angular/forms';
import {IGrade} from '../../../entity/IGrade';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: IStudent;
  id: number;
  formEditStudent: FormGroup;
  listGrade: IGrade[] = [];

  constructor( public activatedRoute: ActivatedRoute,
               public studentService: StudentService,
               public routes : Router) {

  }

  ngOnInit(): void {
    this.studentService.getAllGrade().subscribe(data =>{
      this.listGrade = data;
    });

    this.formEditStudent = new FormGroup({
      name: new FormControl(''),
      dateOfBirth: new FormControl(''),
      phone: new FormControl(''),
      grade: new FormControl(),
      address: new FormControl(''),
      email: new FormControl(''),
      image: new FormControl('')
    });
    this.activatedRoute.paramMap.subscribe((data: ParamMap) =>{
      this.id = Number(data.get('idStudent'));
      console.log(this.id);
    });
    this.studentService.findStudentById(this.id).subscribe(data =>{
      this.student = data;
      this.formEditStudent.patchValue(data);
    });

  }

  save() {

  }
}
