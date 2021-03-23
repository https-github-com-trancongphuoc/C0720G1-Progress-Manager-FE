import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {TeacherService} from '../teacher.service';
import {StudentService} from '../../student/student.service';
import {FormControl, FormGroup} from '@angular/forms';
import {IFaculty} from '../../../entity/IFaculty';
import {IDegree} from '../../../entity/IDegree';
import {finalize} from 'rxjs/operators';
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {
  formCreateTeacher: FormGroup;
  listFaculty: IFaculty[] = [];
  listDegree: IDegree[] = [];
  image: string = 'https://static1.bestie.vn/Mlog/ImageContent/202003/90195464-1520137768148366-7780160422925041664-n-3e4695.jpg';
  selectedImage: any = null;
  idProject: string = 'process-manager-11b67';
  url: string;

  constructor(@Inject(UploadFireService) private uploadFireService : UploadFireService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private teacherService: TeacherService,
              private studentService : StudentService
  ) {
    this.studentService.getAllFaculty().subscribe(data =>{
      this.listFaculty = data;
    });
    this.teacherService.getAllDegree().subscribe(data =>{
      console.log(data);
      this.listDegree = data;
    });
    this.uploadFireService.getImageDetailList();
  }

  ngOnInit(): void {
    this.formCreateTeacher = new FormGroup({
      name: new FormControl(''),
      dateOfBirth: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      faculty: new FormControl(''),
      degree: new FormControl(''),
      avatar: new FormControl(''),
    });
  }

  showPreview(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.image = event.target.result
      };
    }
    this.selectedImage = event.target.files[0];
  }

  choiceFileAvatar() {
    document.getElementById('choiceAvatar').click();
  }

  save() {
    if (this.image == 'https://static1.bestie.vn/Mlog/ImageContent/202003/90195464-1520137768148366-7780160422925041664-n-3e4695.jpg'){
      this.formCreateTeacher.value.avatar = this.image;
      this.teacherService.createTeacher(this.formCreateTeacher.value).subscribe(data =>{
        this.router.navigateByUrl('list-teacher');
      })
    }else {
      this.getLinkFireBaseImage()
    }
  }

  getLinkFireBaseImage(){
    const name = this.selectedImage.name + Date.now() ;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.uploadFireService.insertImageDetails(this.idProject, this.url);
          this.formCreateTeacher.value.avatar = this.url;
          this.teacherService.createTeacher(this.formCreateTeacher.value).subscribe(data =>{
            this.router.navigateByUrl('list-teacher');
          })
        });
      })
    ).subscribe();
  }
}
