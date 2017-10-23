import * as uuid from 'uuid';
import { ILog } from '../interfaces/log.interface';

export class Log implements ILog{
  id: string;
  item: string;
  event: string;
  createdAt: number;

  constructor(item: string, event: string){
    this.id = uuid.v1();
    this.item = item;
    this.event = event;
    this.createdAt = new Date().getTime();
  }

  print(){
   console.log(`timestamp: [${this.createdAt}], item: [${this.item}], event: [${this.event}]`);
  }
}