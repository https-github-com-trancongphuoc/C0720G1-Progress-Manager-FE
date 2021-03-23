import { Component, OnInit } from '@angular/core';
import {ITopic} from "../../../entity/ITopic";
import {TopicService} from "../topic.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  idTopic: number;
  iTopic: ITopic;

  constructor(private topicService: TopicService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTopicById();
  }

  getTopicById(){
    this.idTopic = this.route.snapshot.params['id'];
    this.topicService.findByIdTopic(this.idTopic).subscribe((data:ITopic)=>{
      this.iTopic = data;
    })
  }
}
