import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopicListComponent} from './topic-list/topic-list.component';
import {TopicDetailComponent} from './topic-detail/topic-detail.component';
import {TopicRoutingModule} from "./topic-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [TopicListComponent, TopicDetailComponent],
  imports: [
    CommonModule,
    TopicRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TopicModule {
}
