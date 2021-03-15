import {IInfoTopicRegister} from './IInfoTopicRegister';

export interface IProcess{
  id: number;
  dateStart: string;
  dateEnd: string;
  status: boolean;
  infoTopicRegister: IInfoTopicRegister;
}
