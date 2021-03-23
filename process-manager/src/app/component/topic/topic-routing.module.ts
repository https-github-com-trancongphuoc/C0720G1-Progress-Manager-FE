import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopicListComponent} from "./topic-list/topic-list.component";
import {TopicDetailComponent} from "./topic-detail/topic-detail.component";

const routes: Routes = [
  {path: 'topic-manager', component: TopicListComponent},
  {path: 'topic-detail/:id/detail', component: TopicDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
