const request = require('supertest');
const app = require('../app');
const Admin = require('./model');
const { admins } = require('../test/dataForTests');
const { createFromArray, destroyAll } = require('../lib/util');
const { pick } = require('lodash');

describe('admins rests', () => {
  beforeEach(async () => {
    await createFromArray(Admin, admins);
  });
  afterEach(async () => {
    await destroyAll(Admin);
  });
  describe('create', () => {
    it('should create admin', async () => {
      const adminData = {
        first_name: 'Josephine',
        last_name: 'Moreno',
        email: 'moreno@email.com',
        status: 1,
      };
      const res = await request(app)
        .post('/api/v1/admins')
        .send(adminData)
        .expect(200);
      const adminId = res.body.id;
      expect(adminId).toBeNumber();
      const admin = pick(await Admin.findById(adminId), ['first_name', 'last_name', 'email', 'status']);
      expect(admin).toEqual(adminData);
    });
  });
  describe('retrieve', () => {
    it('should retrieve all admins', async () => {
      const res = await request(app).get('/api/v1/admins').expect(200);
      expect(res.body.length).toBe(admins.length);
    });
  });
  describe('retrieve by id', () => {
    it('should return 404 http code', async () => {
      const res = await request(app).get('/api/v1/admins/9999').expect(404);
      expect(res.body.code).toBe('err_admin_not_found');
    });

    it('should return 400 http code', async () => {
      const res = await request(app).get('/api/v1/admins/badId').expect(400);
      expect(res.body.code).toBe('err_admin_id_not_numeric');
    });

    it('should return admin by id', async () => {
      const adminId = admins[0].id;
      const res = await request(app).get(`/api/v1/admins/${adminId}`).expect(200);
      expect(res.body.id).toBe(adminId);
    });
  });
  describe('update', () => {
    it('should return 404 http code', async () => {
      await request(app)
        .put('/api/v1/admins/9999')
        .send({
          status: 0,
          first_name: 'test_first_name',
          last_name: 'test_last_name',
        })
        .expect(404);
    });
    it('should update admin', async () => {
      const adminId = admins[0].id;
      await request(app)
        .put(`/api/v1/admins/${adminId}`)
        .send({
          status: 0,
          first_name: 'test_first_name',
          last_name: 'test_last_name',
        })
        .expect(204);
      const { status, first_name, last_name } = await Admin.findById(adminId);
      expect(status).toBe(0);
      expect(first_name).toBe('test_first_name');
      expect(last_name).toBe('test_last_name');
    });
  });
});
