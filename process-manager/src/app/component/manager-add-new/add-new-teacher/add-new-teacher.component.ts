import {Component, OnInit} from '@angular/core';
import {AddNewService} from "../add-new.service";
import {Router} from "@angular/router";
import {MessageManager} from "../../comment-post/message-manager";
import {ITeacher, Teacher} from "../../../entity/ITeacher";
import {ExcelService} from "../excel.service";

@Component({
  selector: 'app-add-new-teacher',
  templateUrl: './add-new-teacher.component.html',
  styleUrls: ['./add-new-teacher.component.scss']
})
export class AddNewTeacherComponent implements OnInit {

  public iTeacher: ITeacher[];
  public quantityRecord = 0;
  public studentIndex: number;
  flagLoading: boolean = false;

  constructor(public addNewService: AddNewService,
              public router: Router,
              public excelService: ExcelService,
              public messageManager: MessageManager) {
  }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
    this.flagLoading = true;
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const resultFile: string = e.target.result;
      this.iTeacher = this.excelService.importFromFile(resultFile) as any[];
      this.iTeacher.forEach(value => {
        this.quantityRecord = this.quantityRecord + 1;
      });
        // console.log('this.iTeacher')
        // console.log(this.iTeacher)
    };
    reader.readAsBinaryString(target.files[0]);
  }

  acceptCreate() {
    // console.log('this.iTeacher')
    // console.log(this.iTeacher)
    this.addNewService.createTeacher(this.iTeacher).subscribe(data => {
      this.messageManager.showMessageCreateTeacherExcel(this.quantityRecord)
      this.router.navigateByUrl('/list-teacher');
    });
  }

  deleteEmployeeUpload(index: number) {
    delete this.iTeacher[index];
    this.quantityRecord = this.quantityRecord - 1;
    this.iTeacher = this.iTeacher.filter((value => Teacher));
    this.messageManager.showMessageDeleteTeacherExcel();
  }

  getEmployeeIndex(index: number) {
    this.studentIndex = index;
  }

  exportData(tableId: string) {
    this.excelService.exportToFile("contacts", tableId);
  }

  backList() {
    this.router.navigateByUrl('/list-teacher');
  }

  load() {
    window.location.reload();
  }
}
