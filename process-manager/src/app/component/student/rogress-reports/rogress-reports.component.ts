import {Component, Inject, OnInit} from '@angular/core';
import {StudentService} from "../student.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ITopicProcess} from "../../../entity/ITopicProcess";
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../account/storage.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {IReport} from "../../../entity/IReport";

@Component({
  selector: 'app-rogress-reports',
  templateUrl: './rogress-reports.component.html',
  styleUrls: ['./rogress-reports.component.css']
})
export class RogressReportsComponent implements OnInit {

  progressReports: ITopicProcess;
  idProcess: any;
  content: string = null;
  url: string = null;
  idProject: string = 'project-dating-c8c29';
  report: IReport;
  private selectedImage: any = null;

  constructor(private studentService: StudentService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadFireService) private uploadFileService: UploadFireService,
              private toastr: ToastrService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.idProcess = data.get('id');
      this.studentService.checkCreateReport(this.idProcess).subscribe(data => {
        this.progressReports = data;
      })
    })
  }

  showPreview(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url = event.target.result
      }
    }
    this.selectedImage = event.target.files[0];
    this.url = this.selectedImage;
  }

  save() {
    console.log('dsfsdfsdfsdfsdfsdfsd')
    console.log(this.selectedImage);
    console.log('content' +this.content);
    console.log(this.progressReports)
    if (this.selectedImage !== null) {
      const name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url)
            this.report.url = url;
            console.log(this.url + 'url');
            console.log(this.content + 'content')
            this.report.content = this.content;
            this.uploadFileService.insertImageDetails(this.idProject, this.url);
            this.studentService.createReport(this.report).subscribe(data => {
              this.toastr.success('Báo Cáo Thành Công','THÔNG BÁO')
              this.ngOnInit();
            })
          });
        })
      ).subscribe();

    } else {
      console.log('alo alo')
      // this.report.url = this.url;
      // this.report.content = this.content;
      // this.report.process = this.progressReports;
      // this.studentService.createReport(this.report).subscribe(data => {
      //   this.toastr.success('Sửa Thành Công','THÔNG BÁO');
      //   this.ngOnInit();
      // })
    }
  }
}
