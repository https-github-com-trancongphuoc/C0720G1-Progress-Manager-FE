import {IFaculty} from './IFaculty';

export interface IGrade{
  id: number;
  name: string;
  faculty: IFaculty;
}
