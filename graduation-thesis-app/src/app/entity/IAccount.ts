import {ITeacher} from './ITeacher';
import {IStudent} from './IStudent';

export interface IAccount{
  id: number;
  userName: string;
  passWord: string;
  teacher: ITeacher;
  student: IStudent;
}
