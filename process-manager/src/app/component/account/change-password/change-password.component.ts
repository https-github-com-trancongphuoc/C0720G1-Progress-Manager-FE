import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkPassword} from "../../common/validator/checkNewPassword";
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  accountPercent: any;

  checkOldPassword = false;

  checkValid = false;

  formChangePassword: FormGroup;

  constructor(private storageService: StorageService,
              private fb: FormBuilder,
              private toast: ToastrService,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAccountPercent();

    this.formChangePassword = this.fb.group({
      oldPassword: ['',[Validators.required]],
      newPassword: ['',[Validators.required]],
      repeatPassword: ['',[Validators.required]]
    }, {validators: checkPassword});
  }

  getAccountPercent() {
    this.accountPercent = this.storageService.getUser();
    console.log(this.accountPercent)
  }

  savePassword() {

    if (this.formChangePassword.invalid) {
      this.checkValid = true;
      this.checkOldPassword = this.formChangePassword.value.oldPassword !== this.accountPercent.password;
      return;
    }

    if (this.formChangePassword.value.oldPassword !== this.accountPercent.password) {
      this.checkOldPassword = true;
      return;
    } else {
      this.checkOldPassword = false;
    }

    this.accountPercent.password = this.formChangePassword.value.newPassword;
    this.accountService.changePassword(this.accountPercent).subscribe(data => {
      this.storageService.saveUserLocal(data);
      console.log(this.storageService.getUser());
      this.router.navigateByUrl('');
      this.toast.success('Đổi mật khẩu thành công');
    });


  }
}
