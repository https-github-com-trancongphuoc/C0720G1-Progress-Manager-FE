import {IInfoTopicRegister} from './IInfoTopicRegister';

export interface ITopicProcess{
  id: number;
  dateStart: string;
  dateEnd: string;
  status: boolean;
  processNumber: number;
  percentProcess: number;

  infoTopicRegister: IInfoTopicRegister;
}
