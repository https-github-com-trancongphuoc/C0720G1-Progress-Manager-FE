import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../account/storage.service";
import {ProcessService} from "../../process/process.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-subscribe-topic',
  templateUrl: './subscribe-topic.component.html',
  styleUrls: ['./subscribe-topic.component.css']
})
export class SubscribeTopicComponent implements OnInit {

  formInfoTopicRegister: FormGroup;

  topicList: any;

  checkReadOnly = false;

  accountPercent: any;

  idTopicSelected: any;

  checkLoading = false;

  idProject: string = 'process-manager-11b67';

  topicDetail: any = null;

  selectedImage: any = null;

  selectedDescriptionURL: any = null;

  checkSniper = false;

  constructor(private fb: FormBuilder,
              private storageService: StorageService,
              private processService: ProcessService,
              private router: Router,
              private toast: ToastrService,
              @Inject(UploadFireService) private uploadFireService : UploadFireService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getAccountPercent();

    this.getListTopic();
  }

  getAccountPercent() {
    this.accountPercent = this.storageService.getUser();

    // this.topicList = this.accountPercent.student.grade.faculty.topicList;
    this.formInfoTopicRegister = this.fb.group({
      topic: new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        content: new FormControl('',[Validators.required, Validators.maxLength(1000)]),
        faculty: new FormControl(this.accountPercent.student.grade.faculty),
        image: new FormControl('')
      }),
      descriptionURL: [],
      groupAccount: [this.accountPercent.student.groupAccount]
    });


    console.log(this.accountPercent);
  }


  getListTopic() {
    this.processService.getListTopic(this.accountPercent.student.grade.faculty.id).subscribe(data => {
      this.topicList = data;
      this.checkLoading = true;
    });
  }

  selectTopic(e: any) {
    this.topicDetail = e;
  }

  selectedDescriptionFile(event: any) {
    this.selectedDescriptionURL = event.target.files[0];
  }


  selectedIamge(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getLinkFireBaseImage(){
    const name = this.selectedImage.name + Date.now() ;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          // this.uploadFireService.insertImageDetails(this.idProject, url);
          this.formInfoTopicRegister.value.topic.image = url;

          if (this.selectedDescriptionURL == null) {
            this.processService.registerTopic(this.formInfoTopicRegister.value).subscribe(data => {
              this.toast.success('Đăng ký thành công');
              this.router.navigate(['/group',this.accountPercent.student.groupAccount.id])
            });
          } else {
              this.getLinkFireBaseDescriptionURL();
          }

          console.log(this.formInfoTopicRegister);
        });
      })
    ).subscribe();
  }


  getLinkFireBaseDescriptionURL() {
    const name = this.selectedImage.name + Date.now() ;
    const fileRef = this.storage.ref(name);
    console.log(1);
    this.storage.upload(name, this.selectedDescriptionURL).snapshotChanges().pipe(
      finalize(() => {
        console.log(2);
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.formInfoTopicRegister.value.descriptionURL = url;
          this.processService.registerTopic(this.formInfoTopicRegister.value).subscribe(data => {
            this.toast.success('Đăng ký thành công');
            this.router.navigate(['/group',this.accountPercent.student.groupAccount.id])
          });
        })
      })
    ).subscribe();
  }


  save() {
    if (this.formInfoTopicRegister.invalid || this.selectedImage == null) {
      return;
    } else {
      this.checkSniper = true;
      this.getLinkFireBaseImage();

    }


  }

}
