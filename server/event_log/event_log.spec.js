const app = require('../app');
const request = require('supertest');
const { event_logs } = require('../test/dataForTests');
const EventLog = require('./model');
const moment = require('moment');
const { createFromArray, destroyAll } = require('../lib/util');
const sequelize = require('../lib/sequelize');

describe('event log rests', () => {
  beforeEach(async () => {
    await destroyAll(EventLog);
    await createFromArray(EventLog, event_logs);
  });
  afterEach(async () => {
    await destroyAll(EventLog);
  });
  afterAll(() => sequelize.close());

  describe('get list of events', () => {
    it('should return all events with http code 200', () =>
      request(app)
        .get('/api/v1/events')
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(event_logs.length);
          // assert.oneOf(res.body.length, [event_logs.length, event_logs.length + 1]);
        }));

    it('should return events by codes with http code 200', () =>
      request(app)
        .get('/api/v1/events')
        .expect(200)
        .query({
          codes: ['users_list', 'users_read'],
        })
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(2);
        }));

    it('should return events by date with http code 200', () =>
      request(app)
        .get('/api/v1/events')
        .expect(200)
        .query({
          event_date_from: moment().subtract(2, 'day').toDate(),
          event_date_to: moment().subtract(12, 'hours').toDate(),
        })
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(3);
        }));

    it('should return events by user_id with http code 200', () =>
      request(app)
        .get('/api/v1/events')
        .expect(200)
        .query({
          user_id: 1,
        })
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(2);
        }));

    it('should return events by error filter with http code 200', () =>
      request(app)
        .get('/api/v1/events')
        .expect(200)
        .query({
          is_error: 1,
        })
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(2);
        }));

    it('should return events by all filters http code 200', () =>
      request(app)
        .get('/api/v1/events')
        .expect(200)
        .query({
          is_error: 1,
          user_id: 1,
          event_date_from: moment().subtract(2, 'day').toDate(),
          event_date_to: moment().subtract(12, 'hours').toDate(),
          codes: 'ico_create',
        })
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(1);
        }));
  });

  describe('retreive debug info by id', () => {
    it('should return err code err_event_log_not_found with http code 404', () =>
      request(app)
        .get('/api/v1/events/777/debug_info')
        .expect(404)
        .then((res) => {
          expect(res.body.code).toBe('err_event_log_not_found');
        }));

    it('should return err code err_event_log_not_found with http code 404', () =>
      request(app)
        .get('/api/v1/events/12/debug_info')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({ error: 'test' });
        }));
  });
});
