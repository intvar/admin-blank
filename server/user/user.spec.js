const app = require('../app');
const request = require('supertest');
const { users } = require('../test/dataForTests');
const User = require('./model');
const { createFromArray, destroyAll } = require('../lib/util');

const {
  USER_STATUS_WAITING_VERIFYING,
} = require('../constants');

describe('users rests', () => {
  beforeEach(async () => {
    await createFromArray(User, users);
  });
  afterEach(async () => {
    destroyAll(User);
  });

  describe('get user by id with code err_user_not_found', () => {
    it('should return http status 404', () =>
      request(app)
        .get('/api/v1/users/9999')
        .expect(404)
        .then((res) => {
          expect(res.body.code).toBe('err_user_not_found');
        }));

    it('should return http status 400 with error code err_user_id_not_integer', () =>
      request(app)
        .get('/api/v1/users/badId')
        .expect(400)
        .then((res) => {
          expect(res.body.code).toBe('err_user_id');
        }));

    it('should return user with http status 200', () => {
      const userId = users[0].id;
      return request(app)
        .get(`/api/v1/users/${userId}`)
        .expect(200)
        .then((res) => {
          expect(res.body.id).toBe(userId);
          expect(res.body.password).toBeUndefined();
        });
    });
  });

  describe('retrieve users', () => {
    it('should return users with http status 200', () =>
      request(app)
        .get('/api/v1/users')
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(4);
        }));

    it('should return users with status `waiting verification` and http status 200', () =>
      request(app)
        .get(`/api/v1/users?status=${USER_STATUS_WAITING_VERIFYING}`)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(1);
          expect(res.body[0].status).toBe(USER_STATUS_WAITING_VERIFYING);
        }));

    it('should return users by first_name in search criterion and http status 200', () =>
      request(app)
        .get('/api/v1/users?search_criterion=Jho')
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(1);
          expect(res.body[0].first_name).toBe('Jhon');
        }));

    it('should return users by email in search criterion and http status 200', () =>
      request(app)
        .get('/api/v1/users?search_criterion=jack1')
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
          expect(res.body.length).toBe(1);
          expect(res.body[0].email).toBe('jack1@gmail.com');
        }));
  });

  describe('update user', () => {
    it('should return http status 404', () =>
      request(app)
        .put('/api/v1/users/9999')
        .send({
          first_name: 'Jhon',
        })
        .expect(404)
        .then((res) => {
          expect(res.body.code).toBe('err_user_not_found');
        }));

    it('should return http status 404', () =>
      request(app)
        .put('/api/v1/users/badId')
        .send({
          first_name: 'Jhon',
        })
        .expect(400)
        .then((res) => {
          expect(res.body.code).toBe('err_user_id');
        }));

    it('should return http status 400 with error err_status', () => {
      const userId = users[0].id;
      return request(app)
        .put(`/api/v1/users/${userId}`)
        .send({
          status: 3,
        })
        .expect(400)
        .then((res) => {
          expect(res.body.code).toBe('err_status');
        });
    });

    it('should return http status 400 with error err_not_data', () => {
      const userId = users[0].id;
      return request(app)
        .put(`/api/v1/users/${userId}`)
        .send({})
        .expect(400)
        .then((res) => {
          expect(res.body.code).toBe('err_not_data');
        });
    });

    it('should return 400 status when gender is not correct', () => {
      const userId = users[0].id;
      return request(app)
        .put(`/api/v1/users/${userId}`)
        .send({
          gender: 3,
        })
        .expect(400)
        .then((res) => {
          expect(res.body.code).toBe('err_gender');
        });
    });

    it('should return 400 status when birthday is not correnct', () => {
      const userId = users[0].id;
      return request(app)
        .put(`/api/v1/users/${userId}`)
        .send({
          birthday: '23.24.2222',
        })
        .expect(400)
        .then((res) => {
          expect(res.body.code).toBe('err_birthday');
        });
    });

    it('should update user with http status 204', async () => {
      const userId = users[0].id;
      await request(app)
        .put(`/api/v1/users/${userId}`)
        .send({
          first_name: 'it_update',
          last_name: 'it_update',
        })
        .expect(204);
      const { first_name, last_name } = await User.findById(userId);
      expect(first_name).toBe('it_update');
      expect(last_name).toBe('it_update');
    });
  });

  describe('delete user', () => {
    it('should delete user with http status 204', async () => {
      const userId = users[0].id;
      await request(app)
        .delete(`/api/v1/users/${userId}`)
        .expect(204);
      const user = await User.findById(userId);
      expect(user).toBeNull();
    });

    it('should return http status 404', () =>
      request(app)
        .delete('/api/v1/users/9999')
        .expect(404)
        .then((res) => {
          expect(res.body.code).toBe('err_user_not_found');
        }));
  });
});
