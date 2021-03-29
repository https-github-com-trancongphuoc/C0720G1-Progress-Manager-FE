import {Component, Inject, OnInit} from '@angular/core';

import {AngularFireStorage} from '@angular/fire/storage';
import {Router} from '@angular/router';
import {TeacherService} from '../teacher.service';
import {StudentService} from '../../student/student.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IFaculty} from '../../../entity/IFaculty';
import {IDegree} from '../../../entity/IDegree';
import {finalize} from 'rxjs/operators';
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";
import {checkDateOfBirth} from "../../common/validate/checkBirthdayStudentAndTeacher";

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
  flag = false;

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

  validation_messages = {
    name: [
      {type: 'required', message: 'Vui lòng nhập tên'},
      {type: 'maxlength', message: 'Vui lòng nhập tên không quá 40 kí tự.'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 6 kí tự'},
      {type: 'pattern', message: 'Vui lòng nhập tên đúng'}
    ],
    dateOfBirth: [
      {type: 'required', message: 'Vui lòng nhập ngày sinh'},
      {type: 'checkAge', message: 'Tuổi phải từ 18 đến 50'},
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại'},
      {type: 'pattern', message: 'Vui lòng nhập số địa thoại đúng định dạng 0xxxxxxxxx'}
    ],
    address: [
      {type: 'required', message: 'Vui lòng nhập địa chỉ'},
      {type: 'maxlength', message: 'Vui lòng nhập tên không quá 40 kí tự.'},
      {type: 'minlength', message: 'Vui lòng nhập tên có ít nhất 6 kí tự'},
      {type: 'pattern', message: 'Vui lòng nhập tên đúng'}
    ],
    email: [
      {type: 'required', message: 'Vui lòng nhập email'},
      {type: 'pattern', message: 'Vui lòng nhập email đúng định dạng abcabc@abc.abc'}
    ],
  };

  ngOnInit(): void {
    this.formCreateTeacher = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở" +
        "ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$"),
        Validators.maxLength(40), Validators.minLength(6)]),
      dateOfBirth: new FormControl('', checkDateOfBirth),
      address: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở' +
        'ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$'),
        Validators.maxLength(100), Validators.minLength(6)]),
      phone: new FormControl('',[Validators.required, Validators.pattern("^(0|\\(\\+84\\))\\d{9}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      faculty: new FormControl(''),
      degree: new FormControl(''),
      avatar: new FormControl(''),
      gender: new FormControl(),
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
    this.flag = true;
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
