import {ITopicProcess} from './ITopicProcess';

export interface IReport{
  id: number;
  url: string;
  title: string;
  content: string;
  
  date: string;
  topicProcessReport: ITopicProcess;
}
