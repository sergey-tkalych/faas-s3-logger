import { Context, Callback } from 'aws-lambda';
import Logger from './modules/logger';

const logger = new Logger();

exports.createOnS3Put = (event: any, context: Context, callback: Callback) => {
  logger //Todo Save all records
    .create(event.Records[0].s3.object.key, event.Records[0].eventName)
    .then(log => {
      log.print();

      const response = {
        statusCode: 200,
        body: JSON.stringify(log),
      };
      callback(null, response);
    })
    .catch(error => {
      callback(null, { //Todo Create response module
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the log item.',
      });
    });
};

exports.list = (event: any, context: Context, callback: Callback) => {
  logger
    .list()
    .then(logs => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(logs),
      };
      callback(null, response);
    })
    .catch(error => {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch logs.',
      });
    });
};