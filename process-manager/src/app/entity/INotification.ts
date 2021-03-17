import {IAccount} from './IAccount';

export interface INotification{
  id: number;
  timeNotification: string;
  content: string;
  title: string;
  status: boolean;

  account: IAccount;
}
