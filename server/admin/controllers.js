const { pick } = require('lodash');
const Admin = require('./model');
const {
  getSelectionParameters,
  saveEventLog,
  createError,
  createErrorFromValidate,
} = require('../lib/util');
const FV = require('../lib/FieldValidation');
const isValidBody = require('./validate');

const getAdminById = async (adminId) => {
  FV('admin_id', adminId).isNumeric();
  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw createError(`admin with id = ${adminId} not found`, 404, 'err_admin_not_found');
  }
  return admin;
};

const validBody = (req) => {
  const adminData = pick(req.body, ['status', 'first_name', 'last_name', 'email']);
  if (!isValidBody(adminData)) {
    throw createErrorFromValidate(adminData);
  }
  return adminData;
};

exports.create = async (req, res) => {
  const adminData = validBody(req);
  const admin = await Admin.create(adminData);
  res.status(200).send({
    id: admin.id,
  });
};

exports.retrieve = async (req, res) => {
  const { limit, offset } = getSelectionParameters(req);
  const admins = await Admin.findAll({
    limit,
    offset,
  });
  saveEventLog(req, false, 'list of admins received success');
  res.status(200).send(admins);
};

exports.retrieveById = async (req, res) => {
  const adminId = +req.params.id;
  const admin = await getAdminById(adminId);
  saveEventLog(req, false, 'admin received success');
  res.status(200).send(admin);
};

exports.update = async (req, res) => {
  const adminId = +req.params.id;
  const adminData = validBody(req);
  await getAdminById(adminId);
  await Admin.update(adminData, { where: { id: adminId } });
  saveEventLog(req, false, 'admin updated success');
  res.status(204).send();
};
