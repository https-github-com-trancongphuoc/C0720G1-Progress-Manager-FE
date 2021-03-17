import {IAccount} from './IAccount';
import {ITopicProcess} from './ITopicProcess';

export interface IComment{
  id: number;
  timeComment: string;
  title: string;
  content: string;
  status: boolean;

  replyComment: IComment;
  account: IAccount;
  topicProcess: ITopicProcess;
}
