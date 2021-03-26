import {Component, Inject, OnInit} from '@angular/core';
import {StudentService} from "../student.service";
import {ActivatedRoute, ParamMap, Router, RouterModule} from "@angular/router";
import {ITopicProcess} from "../../../entity/ITopicProcess";
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../account/storage.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {IReport} from "../../../entity/IReport";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-rogress-reports',
  templateUrl: './rogress-reports.component.html',
  styleUrls: ['./rogress-reports.component.css']
})
export class RogressReportsComponent implements OnInit {

  progressReports: ITopicProcess;
  idProcess: any;
  content: string = ' ';
  url: string = null;
  idProject: string = 'project-dating-c8c29';
  report: IReport;
  public pageable: any;
  public page = 0;
  reportList: IReport[];
  form: FormGroup;
  fake: number;
  idInfoRegisterProcess: string;


  nameTopic: any;
  private selectedImage: any = null;
  constructor(private studentService: StudentService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadFireService) private uploadFileService: UploadFireService,
              private toastr: ToastrService,
              private storageService: StorageService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      this.idProcess = data.get('id');
      this.studentService.checkCreateReport(this.idProcess).subscribe(data => {
        this.progressReports = data[0];
        console.log(this.progressReports)
        this.reportList = data[1];
      })
    });

    this.getNameTopic();

  }

  getNameTopic() {
    console.log(this.storageService.getUser())
    let infoRegisterTopicList = this.storageService.getUser().student.groupAccount.infoTopicRegisterList;


    for (let i = 0; i < infoRegisterTopicList.length; i++) {
      if(!infoRegisterTopicList[i].statusComplete) {
        this.idInfoRegisterProcess = infoRegisterTopicList[i].id;
        console.log(this.idInfoRegisterProcess)
        this.nameTopic = infoRegisterTopicList[i].topic.name;
      }
    }

    console.log(infoRegisterTopicList);
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
    this.form = this.formBuilder.group({
      id: [''],
      content: [this.content],
      title: [''],
      url: [''],
      date: [''],
      topicProcessId: [this.progressReports.id]
    });
    if (this.selectedImage !== null) {
      const name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url)
            this.report = this.form.value;
            this.report.url = url;
            console.log(this.report.url)
            this.studentService.createReport(this.report).subscribe(data => {
              this.router.navigateByUrl('/process-detail/' + this.idInfoRegisterProcess)
              this.toastr.success('Báo Cáo Thành Công','THÔNG BÁO')
            })
          });
        })
      ).subscribe();
    } else {
      console.log('alo alo')
      this.toastr.error("Vui lòng chọn file để gửi","THÔNG BÁO");
    }
  }
}
