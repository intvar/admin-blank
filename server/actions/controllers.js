const passport = require('passport');
const {
  saveEventLog,
  generateSymbols,
  createError,
  hashPassword,
} = require('../lib/util');
const moment = require('moment');
const FV = require('../lib/FieldValidation');
const Admin = require('../admin/model');
const {
  ADMIN_STATUS_ACTIVE,
} = require('../constants');
const bcrypt = require('bcryptjs');
const sendForgotPasswordEmail = require('./sendForgotPasswordEmail');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, admin, info) => {
    if (err) return next(err);
    if (!admin) {
      throw createError(info.error, 400, info.code);
    }
    req.logIn(admin, (errLog) => {
      if (errLog) return next(errLog);
      Admin.update({ login_date: new Date() }, { where: { id: admin.id } });
      saveEventLog(req, false, 'login');
      return res.status(200).send({
        id: admin.id,
        email: admin.email,
        first_name: admin.first_name,
        last_name: admin.last_name,
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  saveEventLog(req, false, 'logout');
  return res.sendStatus(200);
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const verify_pass_code = generateSymbols(20);
  const verify_pass_deadline = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');

  FV('email', email).isEmail();

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    throw createError('email not found', 404, 'email_not_found');
  }
  if (admin.status !== ADMIN_STATUS_ACTIVE) {
    throw createError('user disabled', 403, 'user_disabled');
  }
  await Admin.update({
    verify_pass_code, verify_pass_deadline,
  }, { where: { email } });
  sendForgotPasswordEmail(admin);
  saveEventLog(req, false, 'users forgot password');
  res.status(204).send();
};

exports.recoveryPassword = async (req, res) => {
  const { password, verify_pass_code } = req.body;

  FV('password', password).isNonEmpty()
    .isString({ min: 8, max: 50 });
  FV('verify_pass_code', verify_pass_code).isNonEmpty();

  const admin = await Admin.findOne({ where: { verify_pass_code } });
  if (!admin) {
    throw createError('verify pass code not found', 400, 'verify_pass_code_not_found');
  }
  if (moment(admin.verify_pass_deadline) < moment()) {
    throw createError('verify pass code overdue', 400, 'verify_pass_code_overdue');
  }

  const hashedPassword = hashPassword(password);

  await Admin.update({
    password: hashedPassword,
    verify_pass_code: null,
    verify_pass_deadline: null,
    status: ADMIN_STATUS_ACTIVE,
  }, { where: { id: admin.id } });

  saveEventLog(req, false, 'password recovery');
  return res.status(200).send();
};

exports.changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  const { user } = req;

  FV('old_password', old_password).isNonEmpty().isString({ min: 8, max: 50 });
  FV('new_password', new_password).isNonEmpty().isString({ min: 8, max: 50 });

  if (!bcrypt.compareSync(old_password, user.password)) {
    throw createError('Old password wrong.', 400, 'err_old_password_wrong');
  }

  await Admin.update(
    { password: hashPassword(new_password) },
    { where: { id: user.id } },
  );

  saveEventLog(req, false, 'user changed a password successfully');
  res.status(200).send();
};
