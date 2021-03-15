import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
