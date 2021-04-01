import {ITopic} from './ITopic';
import {ITeacher} from './ITeacher';
import {IGroupAccount} from './IGroupAccount';

export interface IInfoTopicRegister{
  id: number;
  status: boolean;
  topic: ITopic;
  teacher: ITeacher;
  group: IGroupAccount;
  topicCancel: boolean;
}
