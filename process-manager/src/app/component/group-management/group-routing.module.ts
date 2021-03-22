import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RegisterGroupComponent } from './register-group/register-group.component';
import {ListGroupComponent} from './list-group/list-group.component';



const routes: Routes = [
  {path: 'register-group', component: RegisterGroupComponent},
  {path: 'list-group', component: ListGroupComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule { }
