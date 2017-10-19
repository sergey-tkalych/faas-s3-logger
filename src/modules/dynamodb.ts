import * as AWS from 'aws-sdk';

export default class DynamoDB{
  static createClient(IS_OFFLINE: string){
    if (IS_OFFLINE) {
      const options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      };
      return new AWS.DynamoDB.DocumentClient(options);
    }

    return new AWS.DynamoDB.DocumentClient();
  }
}