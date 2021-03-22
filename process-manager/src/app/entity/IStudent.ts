import {IGrade} from './IGrade';
import {IAccount} from './IAccount';
import {IGroupAccount} from './IGroupAccount';

export interface IStudent{
  id: number;
  name: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  email: string;
  avatar: string;
  gender: boolean;
  grade: IGrade;
  account: IAccount;
  group: IGroupAccount;
}
