import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonsModule} from './component/common/common.module';
import {AccountModule} from './component/account/account.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {StudentModule} from './component/student/student.module';
import {TeacherModule} from './component/teacher/teacher.module';
import {AngularFireModule} from '@angular/fire';
import {uploadImage} from '../environments/upload-image';
import {GroupModule} from './component/group-management/group.module';
import {ProcessModule} from "./component/process/process.module";
import {imagePost} from "../environments/image-post";
import {TopicModule} from "./component/topic/topic.module";
import {ManagerAddNewModule} from "./component/manager-add-new/manager-add-new.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonsModule,
    AccountModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StudentModule,
    TeacherModule,
    GroupModule,
    ProcessModule,
    TopicModule,
    ManagerAddNewModule,
    AngularFireModule.initializeApp(imagePost.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
