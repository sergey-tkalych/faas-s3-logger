import { Context, Callback } from 'aws-lambda';
import dynamodb from './dynamodb';
import * as uuid from 'uuid';

exports.objectCreated = (event: any, context: Context, callback: Callback) => {
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      item: event.Records[0].s3.object.key,
      createdAt: timestamp
    },
  };

  dynamodb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the log item.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      event,
    };
    callback(null, response);
  });
};

exports.list = (event: any, context: Context, callback: Callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  dynamodb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the log item.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};