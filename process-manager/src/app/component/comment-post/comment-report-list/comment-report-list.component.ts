import {Component, Input, OnInit} from '@angular/core';
import {CommentPostService} from "../comment-post.service";
import {IReport} from "../../../entity/IReport";

@Component({
  selector: 'app-comment-report-list',
  templateUrl: './comment-report-list.component.html',
  styleUrls: ['./comment-report-list.component.scss']
})
export class CommentReportListComponent implements OnInit {
  page: number = 0;
  size: number = 1;
  iReport: IReport[];
  flagComment = false;

  @Input() idProcessReport;

  constructor(private commentPostService: CommentPostService,) { }

  ngOnInit(): void {
    this.getAllListReportSizeInProcess();
  }
  /**
   * TrungTQ: Hiển thị danh sách bài báo cáo theo từng giai đoạn dự án
   * */
  getAllListReportSizeInProcess() {
    this.commentPostService.getAllReportSize(this.idProcessReport, this.page, this.size).subscribe(data => {
      if (data == null){
        this.flagComment = false
      } else {
        this.flagComment = true;
        this.iReport = data.content;
      }
    })
  }

  onClickShowComment() {
    this.size = this.size + 2;
    this.getAllListReportSizeInProcess();
  }

  onClickHideComment() {
    this.size = 1;
    this.getAllListReportSizeInProcess();
  }
}
