import DynamoDB from './dynamodb';
import * as uuid from 'uuid';
import { ILog } from '../interfaces/log.interface';
import { Log } from './log';

const dynamodb = DynamoDB.createClient(process.env.IS_OFFLINE);

export default class Logger {
  private TableName: string;

  constructor() {
    this.TableName = process.env.DYNAMODB_TABLE;
  }

  create(item: string): Promise<ILog> {
    const log = new Log(item, 'created');
    const params = {
      TableName: this.TableName,
      Item: log,
    };

    return dynamodb
      .put(params)
      .promise()
      .then(() => log);
  }

  list(): Promise<any> {
    const params = {
      TableName: this.TableName,
    };
    return dynamodb
      .scan(params)
      .promise()
      .then(result => result.Items);
  }
}