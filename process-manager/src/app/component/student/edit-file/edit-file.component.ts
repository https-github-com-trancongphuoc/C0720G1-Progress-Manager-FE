import { Component, OnInit } from '@angular/core';
import {StudentService} from "../student.service";

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit {

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    // this.studentService.checkCreateReport()
  }

}
