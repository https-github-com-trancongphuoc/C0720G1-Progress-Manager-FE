import {ITopic} from './ITopic';
import {ITeacher} from './ITeacher';
import {IGroup} from './IGroup';

export interface IInfoTopicRegister{
  id: number;
  status: boolean;
  topic: ITopic;
  teacher: ITeacher;
  group: IGroup;
}
