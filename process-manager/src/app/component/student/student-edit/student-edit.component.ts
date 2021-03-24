import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StudentService} from '../student.service';
import {IStudent, IStudentEdit} from '../../../entity/IStudent';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IGrade} from '../../../entity/IGrade';
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";
import {checkDateOfBirth} from "../../common/validate/checkBirthdayStudentAndTeacher";


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: IStudentEdit;
  id: number;
  formEditStudent: FormGroup;
  listGrade: IGrade[] = [];
  selectedImage: any = null;
  idProject: string = 'process-manager-11b67';
  url: string;
  img: string = '';

  constructor( public activatedRoute: ActivatedRoute,
               public studentService: StudentService,
               @Inject(UploadFireService) private uploadFireService : UploadFireService,
               @Inject(AngularFireStorage) private storage: AngularFireStorage,
               private router: Router) {

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
    this.studentService.getAllGrade().subscribe(data =>{
      this.listGrade = data;
    });

    this.formEditStudent = new FormGroup({
      id: new FormControl(),
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
      image: new FormControl(),
      gender: new FormControl(1, Validators.required)
    });
    this.activatedRoute.paramMap.subscribe((data: ParamMap) =>{
      this.id = Number(data.get('idStudent'));
      console.log(this.id);
    });
    this.studentService.findStudentById(this.id).subscribe(data =>{
      this.student = data;
      this.img = data.image;
      this.formEditStudent.patchValue(data);
      console.log(data);
    });

  }

  save() {
    if (this.img == this.student.image){
      this.formEditStudent.value.image = this.img;
      this.studentService.editStudent(this.formEditStudent.value).subscribe(data =>{
        this.router.navigateByUrl('list-student');
      })
    }else {
      this.getFireBaseImage()
    }
  }

  getFireBaseImage(){
    const name = this.selectedImage.name + Date.now() ;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          // this.uploadFireService.insertImageDetails(this.idProject, this.url);
          this.formEditStudent.value.image = this.url;
          this.studentService.editStudent(this.formEditStudent.value).subscribe(data =>{
            this.router.navigateByUrl('list-student');
          })
        });
      })
    ).subscribe();
  }

  choiceFileAvatar() {
    document.getElementById('choiceAvatarEdit').click();
  }

  showImage(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.img = event.target.result;
      };
    }
    this.selectedImage = event.target.files[0];
  }
}
