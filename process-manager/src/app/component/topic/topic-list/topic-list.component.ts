import {Component, OnInit} from '@angular/core';
import {ITopic} from "../../../entity/ITopic";
import {TopicService} from "../topic.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageManager} from "../../comment-post/message-manager";

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  name: string = '';
  string: string = '';
  page: number = 0;
  size: number = 3;
  iTopic: ITopic[];
  public pageable: any;
  totalPages: number;

  formGroup: FormGroup;

  constructor(private topicService: TopicService,
              public formBuilder: FormBuilder,
              public messageManager: MessageManager) {
  }

  ngOnInit(): void {
    this.getAllTopicSearch();
    this.ngSubmit();
  }

  /**
   * TrungTQ: Hiển thị danh sách dự án, tìm kiếm
   * */
  getAllTopicSearch() {
    if (!Number(this.page) || Number(this.page) <0 ){
      this.page = 0;
    }
    this.topicService.getAllTopicFind(this.name, this.page, this.size).subscribe(data => {
      if (data === null ){
        this.messageManager.showMessageSearch();
        setTimeout(()=>{
          this.getReload();
        }, 600)
      } else {
        this.iTopic = data.content;
        this.pageable = data;
        this.totalPages = this.pageable.totalPages;
      }
    })
  }

  getReload(){
    window.location.reload()
  }

  ngSubmit(){
    this.formGroup = this.formBuilder.group({
      name:['', [Validators.required]],
    })
  }

  /**
   * TrungTQ: Cắt ngắn bớt giới thiệu
   * */
  getShortName(name: string, size: number): string {
    if (name?.length > size) {
      return name.substring(0, size).concat('...');
    } else {
      return name;
    }
  }
}
