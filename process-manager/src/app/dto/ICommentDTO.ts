import {IAccount} from '../entity/IAccount';
import {ITopicProcess} from '../entity/ITopicProcess';
import {IComment} from '../entity/IComment';

export interface ICommentDTO {
  id: number;
  timeComment: string;
  title: string;
  content: string;
  status: boolean;
  toggle: boolean;
  replyCommentList: IComment[];

  replyComment: IComment;
  account: IAccount;
  topicProcess: ITopicProcess;
}
