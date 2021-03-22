import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { ListGroupComponent } from './list-group/list-group.component';
import {RegisterGroupComponent} from './register-group/register-group.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListGroupComponent, RegisterGroupComponent],
    imports: [
        CommonModule,
        GroupRoutingModule,
        FormsModule,
    ]
})
export class GroupModule { }
