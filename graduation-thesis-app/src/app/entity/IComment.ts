import {IAccount} from './IAccount';
import {IProcess} from './IProcess';

export interface IComment{
  id: number;
  timeComment: string;
  title: string;
  content: string;
  replyComment: IComment;
  account: IAccount;
  process: IProcess;
}
