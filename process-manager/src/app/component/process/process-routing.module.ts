import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcessListComponent} from './process-list/process-list.component';
import {ProcessDetailComponent} from './process-detail/process-detail.component';


const routes: Routes = [
  {path: 'process-manager', component: ProcessListComponent},
  {path: 'process-detail/:id', component: ProcessDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }
