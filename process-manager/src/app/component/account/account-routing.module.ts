import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CheckLoginGuard} from "../common/gurad/check-login.guard";
import {MyGroupComponent} from "./my-group/my-group.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [CheckLoginGuard]},
  {path: 'group/:id', component: MyGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
