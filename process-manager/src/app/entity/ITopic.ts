import {IFaculty} from "./IFaculty";

export interface ITopic{
  id: number;
  name: string;
  introduce: string;
  image: string;
  content: string;

  faculty : IFaculty
}
