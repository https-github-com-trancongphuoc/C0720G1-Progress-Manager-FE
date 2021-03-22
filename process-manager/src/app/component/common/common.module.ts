import {NgModule} from '@angular/core';
import {CommonRoutingModule} from './common-routing.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CommonModule} from '@angular/common';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CommonRoutingModule
  ]
})
export class CommonsModule {
}
