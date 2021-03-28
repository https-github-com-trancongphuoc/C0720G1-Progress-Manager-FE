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
  status_join: boolean;
  grade: IGrade;
  account: IAccount;
  group: IGroupAccount;
}

export class Student{
  id: number;
  name: string;
  dateOfBirth: string;
  address: string;
  email: string;
  avatar: string;
  gender: boolean;
  status_join: boolean;

  grade: IGrade;
  account: IAccount;
  group: IGroupAccount;
}

export interface IStudent1{
  id: number;
  name: string;
  dateOfBirth: string;
  address: string;
  email: string;
  avatar: string;
  gender: boolean;
  nameGrade: string;
  status_join: boolean;

}

export interface IStudentEdit{
  id: number;
  name: string;
  dateOfBirth: string;
  phone: string;
  grade: number;
  address: string;
  email: string;
  image: string;
  gender: boolean;
}
