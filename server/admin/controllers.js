const { pick } = require('lodash');
const moment = require('moment');
const Admin = require('./model');
const {
  getSelectionParameters,
  saveEventLog,
  createError,
  createErrorFromValidate,
  getUserName,
  generateSymbols,
} = require('../lib/util');
const FV = require('../lib/FieldValidation');
const { createValidate, updateValidate } = require('./validate');
const { send: sendEmail, saveLogNewAdminEmail } = require('../lib/mailjet');
const templateId = require('../config').get('mailjet:templates:newAdmin');
const adminAuthLinkTemplate = require('../config').get('mailjet:links:adminAuth');

const getAdminById = async (adminId) => {
  FV('admin_id', adminId).isNumeric();
  const admin = await Admin.findById(adminId);
  if (!admin) {
    throw createError(`admin with id = ${adminId} not found`, 404, 'err_admin_not_found');
  }
  return admin;
};

const validateBody = (bodyData, validateStrategy) => {
  if (!validateStrategy(bodyData)) {
    throw createErrorFromValidate(validateStrategy);
  }
  return bodyData;
};

exports.create = async (req, res) => {
  const adminData = pick(req.body, ['status', 'first_name', 'last_name', 'email']);
  validateBody(adminData, createValidate);
  adminData.verify_pass_code = generateSymbols(20);
  adminData.verify_pass_deadline = moment().add(1, 'hour').toDate();
  const { id } = await Admin.create(adminData);
  saveEventLog(req, false, 'admin created success');
  res.status(200).send({ id });
  const name = getUserName(adminData.first_name, adminData.last_name);
  const link = adminAuthLinkTemplate.replace('{{verify_pass_code}}', adminData.verify_pass_code);
  try {
    await sendEmail({
      email: adminData.email,
      name,
      templateId,
      variables: {
        link,
        name,
      },
    });
    saveLogNewAdminEmail(id, adminData.email);
  } catch (err) {
    saveLogNewAdminEmail(id, adminData.email, err);
  }
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
  const adminData = pick(req.body, ['status', 'first_name', 'last_name']);
  validateBody(adminData, updateValidate);
  const adminId = +req.params.id;
  await getAdminById(adminId);
  await Admin.update(adminData, { where: { id: adminId } });
  saveEventLog(req, false, 'admin updated success');
  res.status(204).send();
};
