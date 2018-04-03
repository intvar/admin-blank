const app = require('../app');
const request = require('supertest');
const { event_codes } = require('../test/dataForTests');
const EventCode = require('./model');
const { destroyAll, createFromArray } = require('../lib/util');
const sequelize = require('../lib/sequelize');


describe('event code rests', () => {
  beforeEach(async () => {
    await destroyAll(EventCode);
    await createFromArray(EventCode, event_codes);
  });
  afterEach(() => destroyAll(EventCode));
  afterAll(() => sequelize.close());
  describe('get list of event codes', () => {
    it('should return all events with http code 200', () =>
      request(app)
        .get('/api/v1/event_codes')
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(event_codes.length);
        }));
  });
});
