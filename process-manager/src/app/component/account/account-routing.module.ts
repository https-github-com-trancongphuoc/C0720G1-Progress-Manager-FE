import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CheckLoginGuard} from "../common/gurad/check-login.guard";
import {MyGroupComponent} from "./my-group/my-group.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [CheckLoginGuard]},
  {path: 'group/:id', component: MyGroupComponent},
  {path: 'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
