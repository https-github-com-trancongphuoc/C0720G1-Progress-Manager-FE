import {IAccount} from './IAccount';
import {IStudent} from './IStudent';

export interface IGroupAccount{
  id: number;
  name: string;
  delete_flag: boolean;
  status: boolean;
  studentList: IStudent[];
  quantity: number;
}
export interface IQuantityStudent {
  name: string;
  quantity: number;
}
