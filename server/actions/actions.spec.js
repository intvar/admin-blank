const app = require('../app');
const request = require('supertest');
const { admins } = require('../test/dataForTests');
const Admin = require('../admin/model');
const bcrypt = require('bcryptjs');
const { createFromArray, destroyAll } = require('../lib/util');
const { send } = require('../lib/mailjet');
const sequelize = require('../lib/sequelize');

jest.mock('../lib/mailjet');
send.mockReturnValue(Promise.resolve());

describe('actions rests', () => {
  beforeEach(async () => {
    send.mockClear();
    await createFromArray(Admin, admins);
  });
  afterEach(async () => {
    await destroyAll(Admin);
  });
  afterAll(() => sequelize.close());

  describe('login', () => {
    it('should return 400 status with code incorrect_password', () =>
      request(app)
        .put('/api/v1/actions/login')
        .expect(400)
        .send({
          email: 'not@found.com',
          password: 'password',
        })
        .then((res) => {
          expect(res.body.code).toBe('incorrect_password');
        }));

    it('should return 400 status with code incorrect_password', () => {
      const { email, password } = admins[1];
      return request(app)
        .put('/api/v1/actions/login')
        .expect(400)
        .send({
          email,
          password,
        })
        .then((res) => {
          expect(res.body.code).toBe('incorrect_password');
        });
    });

    it('should return 400 status with code incorrect_password', () => {
      const { email } = admins[0];
      return request(app)
        .put('/api/v1/actions/login')
        .expect(400)
        .send({
          email,
          password: 'bad_password',
        })
        .then((res) => {
          expect(res.body.code).toBe('incorrect_password');
        });
    });

    it('should authorize user with code 200 and return user data', () => {
      const { id, email } = admins[0];
      return request(app)
        .put('/api/v1/actions/login')
        .expect(200)
        .send({
          email,
          password: '123qwe321',
        })
        .then((res) => {
          expect(res.body.id).toBe(id);
        });
    });
  });

  describe('logout', () => {
    it('should return code 200 for logout action', () => {
      const { email } = admins[0];
      return request(app)
        .put('/api/v1/actions/logout')
        .expect(200)
        .send({
          email,
        });
    });
  });

  describe('forgot password', () => {
    it('should return code 404 with code email_not_found', () =>
      request(app)
        .put('/api/v1/actions/forgot_password')
        .expect(404)
        .send({
          email: 'fake@email.com',
        })
        .then((res) => {
          expect(res.body.code).toBe('email_not_found');
        }));

    it('should return code 403 with code user_disabled', () =>
      request(app)
        .put('/api/v1/actions/forgot_password')
        .expect(403)
        .send({
          email: admins[1].email,
        })
        .then((res) => {
          expect(res.body.code).toBe('user_disabled');
        }));

    it('should return code 200 and send email', () => {
      const templateIdForgotPassword = require('../config').get('mailjet:templates:forgotPasswordAdmin');
      const { email } = admins[0];
      return request(app)
        .put('/api/v1/actions/forgot_password')
        .expect(204)
        .send({
          email,
        })
        .then(() => {
          const userName = 'Raul Kelleyu';
          expect(send).toBeCalled();
          const {
            email: sendEmail,
            name,
            templateId,
            variables: {
              link,
              name: variableName,
            },
          } = send.mock.calls[0][0];
          expect(sendEmail).toBe(email);
          expect(name).toBe(userName);
          expect(templateId).toBe(templateIdForgotPassword);
          expect(link).toBeDefined();
          expect(variableName).toBe(userName);
        });
    });
  });

  describe('recovery password', () => {
    it('should return code 400 with error verify_pass_code_not_found', () =>
      request(app)
        .put('/api/v1/actions/recovery_password')
        .expect(400)
        .send({
          verify_pass_code: 'fake_pass_code',
          password: 'new password',
        })
        .then((res) => {
          expect(res.body.code).toBe('verify_pass_code_not_found');
        }));

    it('should return code 400 with error verify_pass_code_overdue', () =>
      request(app)
        .put('/api/v1/actions/recovery_password')
        .expect(400)
        .send({
          verify_pass_code: 'overdue_pass_code',
          password: 'new password',
        })
        .then((res) => {
          expect(res.body.code).toBe('verify_pass_code_overdue');
        }));

    it('should return code 200 with data user', async () => {
      const admin = admins[0];
      const newPassword = 'new password';
      await request(app)
        .put('/api/v1/actions/recovery_password')
        .expect(200)
        .send({
          verify_pass_code: admin.verify_pass_code,
          password: newPassword,
        });
      const { verify_pass_code, verify_pass_deadline, password } = await Admin.findById(admin.id);
      expect(verify_pass_code).toBeNull();
      expect(verify_pass_deadline).toBeNull();
      expect(bcrypt.compareSync(newPassword, password)).toBeTruthy();
    });
  });

  describe('change password', () => {
    it('should return 400 code, when old_password not passed', () =>
      request(app)
        .put('/api/v1/actions/change_password')
        .expect(400)
        .send({
          old_password: '',
          new_password: '123',
        })
        .then((res) => {
          expect(res.body.code).toBe('err_old_password_min_length');
        }));

    it('should return 400 code, when new_password not passed', () =>
      request(app)
        .put('/api/v1/actions/change_password')
        .expect(400)
        .send({
          old_password: 'testtesttest',
          new_password: '',
        })
        .then((res) => {
          expect(res.body.code).toBe('err_new_password_min_length');
        }));

    it('should return 400 code, when old_password wrong', () =>
      request(app)
        .put('/api/v1/actions/change_password')
        .expect(400)
        .send({
          old_password: '1233213123',
          new_password: 'asdfasdf',
        })
        .then((res) => {
          expect(res.body.code).toBe('err_old_password_wrong');
        }));

    it('should return 200 code, when all right', async () =>
      request(app)
        .put('/api/v1/actions/change_password')
        .expect(200)
        .send({
          old_password: '123qwe321',
          new_password: 'asdfasdf',
        }));
  });
});
