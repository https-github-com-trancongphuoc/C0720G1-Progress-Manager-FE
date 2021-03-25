import { Component, OnInit } from '@angular/core';
import {IStudent, Student} from "../../../entity/IStudent";
import {AddNewService} from "../add-new.service";
import {Router} from "@angular/router";
import {MessageManager} from "../../comment-post/message-manager";
import {ExcelService} from "../excel.service";

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.scss']
})
export class AddNewStudentComponent implements OnInit {
  public iStudent: IStudent[];
  public quantityRecord = 0;
  public studentIndex: number;

  constructor(public addNewService: AddNewService,
              public router: Router,
              public excelService: ExcelService,
              public messageManager: MessageManager) { }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const resultFile: string = e.target.result;
      this.iStudent = this.excelService.importFromFile(resultFile) as any[];
      this.iStudent.forEach(value => {
        this.quantityRecord = this.quantityRecord + 1;
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  acceptCreate() {
    this.addNewService.createStudent(this.iStudent).subscribe(data => {
      this.messageManager.showMessageCreateStudentExcel(this.quantityRecord)
      this.router.navigateByUrl('/list-student');
    });
  }

  deleteEmployeeUpload(index: number) {
    delete this.iStudent[index];
    this.quantityRecord = this.quantityRecord - 1;
    this.iStudent = this.iStudent.filter((value =>  Student));
    this.messageManager.showMessageDeleteStudentExcel()
  }

  getEmployeeIndex(index: number) {
    this.studentIndex = index;
  }

  reset() {
    this.router.navigateByUrl('/list-student');
  }
}
