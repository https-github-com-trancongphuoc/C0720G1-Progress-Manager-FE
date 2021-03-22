import {Component, Inject, OnInit} from '@angular/core';
import {StudentService} from '../student.service';
import {IGrade} from '../../../entity/IGrade';
import {IFaculty} from '../../../entity/IFaculty';
import {FormControl, FormGroup} from '@angular/forms';
import {UploadFireService} from '../../common/upload-fire-service/upload-fire.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  public listGrade : IGrade[] = [];
  public listFaculty: IFaculty[] = [];
  public formCreateStudent: FormGroup;
  public image : string = 'https://static1.bestie.vn/Mlog/ImageContent/202003/90195464-1520137768148366-7780160422925041664-n-3e4695.jpg';
  selectedImage: any = null;
  idProject: string = 'process-manager-11b67';
  url: string;


  constructor( private studentService : StudentService,
               @Inject(UploadFireService) private uploadFireService : UploadFireService,
               @Inject(AngularFireStorage) private storage: AngularFireStorage,
               private router: Router,
  ) {
      this.studentService.getAllGrade().subscribe(data =>{
        this.listGrade = data;
      });
      this.studentService.getAllFaculty().subscribe(data =>{
        this.listFaculty = data;
      });
    this.uploadFireService.getImageDetailList();
  }

  ngOnInit(): void {
    this.formCreateStudent = new FormGroup({
      name: new FormControl(''),
      dateOfBirth: new FormControl(''),
      phone: new FormControl(''),
      grade: new FormControl(1),
      faculty: new FormControl(1),
      address: new FormControl(''),
      email: new FormControl(''),
      image: new FormControl(this.image)
    })
  }

  save() {
    if (this.image == 'https://static1.bestie.vn/Mlog/ImageContent/202003/90195464-1520137768148366-7780160422925041664-n-3e4695.jpg'){
      this.formCreateStudent.value.image = this.image;
      this.studentService.createStudent(this.formCreateStudent.value).subscribe(data =>{
        this.router.navigateByUrl('list-student');
      })
    }else {
      this.getLinkFireBaseImage()
    }
  }

  choiceFileAvatar() {
    document.getElementById('choiceAvatar').click();
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

  getLinkFireBaseImage(){
    const name = this.selectedImage.name + Date.now() ;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.uploadFireService.insertImageDetails(this.idProject, this.url);
          this.formCreateStudent.value.image = this.url;
          this.studentService.createStudent(this.formCreateStudent.value).subscribe(data =>{
            this.router.navigateByUrl('list-student');
          })
        });
      })
    ).subscribe();
  }
}
