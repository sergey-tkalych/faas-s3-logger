import * as assert from 'assert';
import Logger from '../modules/logger';

const logger = new Logger();

describe('Logger', () => {
  describe('create', () => {
    it('should create log', (done) => {
      const item = 'image.png';

      logger.create(item)
        .then(log => {
          assert.equal(item, log.item);
          assert.equal(true, log.hasOwnProperty('id'));
          assert.equal(true, log.hasOwnProperty('createdAt'));
          done();
        })
    });
  });

  describe('list', () => {
    it('should get logs', (done) => {
      logger.list()
        .then(logs => {
          assert.equal(true, Array.isArray(logs));
          done();
        })
    });
  });
});