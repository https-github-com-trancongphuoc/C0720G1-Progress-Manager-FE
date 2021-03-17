import {NgModule} from '@angular/core';
import {CommonRoutingModule} from './common-routing.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
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
