import {IGrade} from './IGrade';
import {IAccount} from './IAccount';
import {IGroup} from './IGroup';

export interface IStudent{
  id: number;
  name: string;
  dateOfBirth: string;
  address: string;
  email: string;
  avatar: string;
  grade: IGrade;
  account: IAccount;
  group: IGroup;
}
