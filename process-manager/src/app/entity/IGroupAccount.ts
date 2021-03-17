import {IAccount} from './IAccount';
import {IStudent} from './IStudent';

export interface IGroupAccount{
  id: number;
  name: string;
  studentList: IStudent[];
}
