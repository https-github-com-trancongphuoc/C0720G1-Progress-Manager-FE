import {IDegree} from './IDegree';
import {IFaculty} from './IFaculty';
import {IAccount} from './IAccount';

export interface ITeacher{
  id: number;
  name: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  email: string;
  avatar: string;
  gender: boolean;

  degree: IDegree;
  faculty: IFaculty;
  account: IAccount;
}
