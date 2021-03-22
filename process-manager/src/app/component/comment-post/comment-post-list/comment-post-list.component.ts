import {Component, Input, OnInit} from '@angular/core';
import {CommentPostService} from "../comment-post.service";
import {IComment} from "../../../entity/IComment";

@Component({
  selector: 'app-comment-post-list',
  templateUrl: './comment-post-list.component.html',
  styleUrls: ['./comment-post-list.component.scss']
})
export class CommentPostListComponent implements OnInit {

  page: number = 0;
  size: number = 1;
  iComments: IComment[];

  @Input() idProcess;

  constructor(private commentPostService: CommentPostService) { }

  ngOnInit(): void {
    this.getAllListCommentSizeInProcess();
  }

  getAllListCommentSizeInProcess(){
    this.commentPostService.getAllCommentSize(this.idProcess, this.page, this.size).subscribe(data =>{
      this.iComments = data.content;
    })
  }

  onClickShowComment() {
    this.size = this.size + 2;
    this.getAllListCommentSizeInProcess();
  }

  onClickHideComment() {
    this.size = 1;
    this.getAllListCommentSizeInProcess();
  }


}
