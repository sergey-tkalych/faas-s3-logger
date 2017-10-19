import * as uuid from 'uuid';
import { ILog } from '../interfaces/log.interface';

export class Log implements ILog{
  id: string;
  item: string;
  createdAt: number;

  constructor(item: string){
    this.id = uuid.v1();
    this.item = item;
    this.createdAt = new Date().getTime();
  }

  print(){
   console.log(`[${this.createdAt}]: ${this.item}`);
  }
}