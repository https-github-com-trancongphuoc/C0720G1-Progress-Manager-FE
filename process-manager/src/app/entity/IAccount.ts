import {ITeacher} from './ITeacher';
import {IStudent} from './IStudent';
import {IAccountRole} from './IAccountRole';

export interface IAccount{
  id: number;
  userName: string;
  passWord: string;

  accountRoleList: IAccountRole[];
  teacher: ITeacher;
  student: IStudent;
}
