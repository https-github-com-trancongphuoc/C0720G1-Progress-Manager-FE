import {Component, Inject, OnInit} from '@angular/core';
import {StudentService} from '../student.service';
import {IGrade} from '../../../entity/IGrade';
import {IFaculty} from '../../../entity/IFaculty';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";
import {checkDateOfBirth} from "../../common/validate/checkBirthdayStudentAndTeacher";



@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  public listGrade: IGrade[] = [];
  public listFaculty: IFaculty[] = [];
  public formCreateStudent: FormGroup;
  public image: string = 'https://static1.bestie.vn/Mlog/ImageContent/202003/90195464-1520137768148366-7780160422925041664-n-3e4695.jpg';
  selectedImage: any = null;
  idProject: string = 'process-manager-11b67';
  url: string;
  isSubmit: boolean = true;
  flag = false;

  constructor(private studentService: StudentService,
              @Inject(UploadFireService) private uploadFireService: UploadFireService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
  ) {
    this.studentService.getAllGrade().subscribe(data => {
      this.listGrade = data;
    });
    this.studentService.getAllFaculty().subscribe(data => {
      this.listFaculty = data;
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
    gender: [
      {type: 'required', message: 'Vui lòng chọn giới tính'},
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
    grade: [
      {type: 'required', message: 'Vui chọn lớp'}
    ],
    faculty: [
      {type: 'required', message: 'Vui chọn khoa'}
    ],
  };

  ngOnInit(): void {
    this.formCreateStudent = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở" +
        "ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$"),
        Validators.maxLength(40), Validators.minLength(6)]),
      dateOfBirth: new FormControl('', [Validators.required, checkDateOfBirth]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^(0|\\(\\+84\\))\\d{9}$")]),
      grade: new FormControl(1, Validators.required),
      faculty: new FormControl(1, Validators.required),
      address: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở' +
        'ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$'),
        Validators.maxLength(100), Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      image: new FormControl(this.image),
      gender: new FormControl(1, Validators.required)
    })
  }

  save() {
    this.flag = true;
    if (this.formCreateStudent.invalid) {
      this.isSubmit = false;
      console.log(this.formCreateStudent);
    } else {
      if (this.image == 'https://static1.bestie.vn/Mlog/ImageContent/202003/90195464-1520137768148366-7780160422925041664-n-3e4695.jpg') {
        this.formCreateStudent.value.image = this.image;
        this.studentService.createStudent(this.formCreateStudent.value).subscribe(data => {
          this.router.navigateByUrl('list-student');
        })
      } else {
        this.getLinkFireBaseImage()
      }
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

  getLinkFireBaseImage() {
    const name = this.selectedImage.name + Date.now();
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.uploadFireService.insertImageDetails(this.idProject, this.url);
          this.formCreateStudent.value.image = this.url;
          this.studentService.createStudent(this.formCreateStudent.value).subscribe(data => {
            this.router.navigateByUrl('list-student');
          })
        });
      })
    ).subscribe();
  }
}
