import {IAccount} from './IAccount';

export interface INotification{
  id: number;
  timeNotification: string;
  content: string;
  account: IAccount;
}
