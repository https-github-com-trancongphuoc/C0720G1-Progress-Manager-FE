import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {StudentService} from "../../student/student.service";
import {UploadFireService} from "../../upload-fire-service/upload-fire-service";
import {AngularFireStorage} from "@angular/fire/storage";
import {TeacherService} from "../teacher.service";
import {IFaculty} from "../../../entity/IFaculty";
import {IDegree} from "../../../entity/IDegree";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITeacherEditDTO} from "../../../entity/ITeacher";
import {finalize} from "rxjs/operators";
import {checkDateOfBirth} from "../../common/validate/checkBirthdayStudentAndTeacher";

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
  listFaculty: IFaculty[] = [];
  listDegree: IDegree[] = [];
  id: number;
  formEditTeacher: FormGroup;
  selectedImage: any = null;
  idProject: string = 'process-manager-11b67';
  url: string;
  img: string = '';
  teacher: ITeacherEditDTO;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService,
              @Inject(UploadFireService) private uploadFireService : UploadFireService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private teacherService: TeacherService
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
    this.formEditTeacher = new FormGroup({
      id: new FormControl(),
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
    this.activatedRoute.paramMap.subscribe((data:ParamMap) =>{
      this.id = Number(data.get('idTeacher'));

    });
    this.teacherService.findTeacherById(this.id).subscribe(data =>{
      this.teacher =  data;
      this.img = data.avatar;
      this.formEditTeacher.patchValue(data);
    })
  }


  showPreview(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.img = event.target.result
      };
    }
    this.selectedImage = event.target.files[0];
  }

  choiceFileAvatar() {
    document.getElementById('choiceAvatar').click();
  }

  save() {
    console.log(this.formEditTeacher.value);
    if (this.img == this.teacher.avatar){
      this.formEditTeacher.value.avatar = this.teacher.avatar;
      this.teacherService.editTeacher(this.formEditTeacher.value).subscribe(data =>{
        this.router.navigateByUrl('list-teacher');
      })
    }else {
      this.getLinkImage()
    }
  }

  getLinkImage(){
    const name = this.selectedImage.name + Date.now() ;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.uploadFireService.insertImageDetails(this.idProject, this.url);
          this.formEditTeacher.value.avatar = this.url;
          this.teacherService.editTeacher(this.formEditTeacher.value).subscribe(data =>{
            this.router.navigateByUrl('list-teacher');
          })
        });
      })
    ).subscribe();
  }
}
