import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../account.service';
import {StorageService} from '../storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  checkSuccessLogin = true;

  constructor(private fb: FormBuilder,
              private toast: ToastrService,
              private accountService: AccountService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.maxLength(32)]],
      rememberMe: [true]
    });
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      // this.toast.error('Đăng nhập thất bại');
      this.checkSuccessLogin = false;
      console.log(this.storageService.getUser());
      console.log(this.storageService.getToken());
      return;
    } else {
      this.accountService.login(this.loginForm.value).subscribe(data => {

        console.log(data);

        if (this.loginForm.value.rememberMe) {
          this.storageService.saveTokenLocal(data.token);
          this.storageService.saveUserLocal(data.account);
        } else {
          this.storageService.saveTokenSession(data.token);
          this.storageService.saveUserSession(data.account);
        }

        this.router.navigateByUrl('').then(data => {
          window.location.reload();
        });
      }, error => {
        // this.toast.error('Bạn nhập sai tài khoản hoặc mật khẩu');
        this.checkSuccessLogin = false;
      });
    }
  }
}
