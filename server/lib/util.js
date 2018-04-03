const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { isDataURI } = require('validator');
const EventLog = require('../event_log/model');
const EventCode = require('../event_code/model');

/**
 * Save event log.
 * @param {Object} req - request from express.
 * @param {Boolean} is_error
 * @param {Object} data - information about log: { description: Object, debug_info: Object }
 */
exports.saveEventLog = (req, is_error, data) => {
  const event_id = req.event_id || 'empty_code';

  let debug_info;
  if (is_error) {
    debug_info = {};
    debug_info.body = Object.keys(req.body || {})
      .reduce((acc, fieldName) => {
        acc[fieldName] = (typeof req.body[fieldName] === 'string') && isDataURI(req.body[fieldName]) ?
          'valid data: URL value' : req.body[fieldName];
        return acc;
      }, {});

    debug_info.params = req.paramsLog;
    debug_info.query_string = req.query;
  }
  if (data && data.debug_info) {
    if (!debug_info) debug_info = {};
    debug_info.debug_info = data.debug_info;
  }

  // maybe replace on cache
  EventCode.findById(event_id)
    .then((eventCode) => {
      if (!eventCode) {
        return EventCode.create({ id: event_id });
      }
    })
    .then(() => EventLog.create({
      event_id,
      description: data && data.description && data.description.substr(0, 200),
      is_error: +is_error,
      user_id: req.user && req.user.id,
      debug_info,
    }))
  /* eslint no-console:0 */
    .catch(err => console.log(err));
};

exports.setEventId = event_id => (req, res, next) => {
  req.event_id = event_id;
  req.paramsLog = req.params;
  next();
};

const createError = (description, httpStatus, code, debugInfo) => {
  const error = new Error(description);
  error.httpStatus = httpStatus;
  error.code = code;
  if (debugInfo) {
    error.debugInfo = debugInfo;
  }
  return error;
};
exports.createError = createError;

exports.createErrorFromValidate = (validate, httpStatus = 400) => {
  const { dataPath, message } = validate.errors[0];
  const description = `${dataPath} ${message}`.replace('.', '');
  const code = `err${dataPath.replace('.', '_')}`;
  return createError(description, httpStatus, code);
};

exports.generateSymbols = len => crypto.randomBytes(Math.trunc(len / 2)).toString('hex');

exports.isOperator = req => req.user && req.user.permissions && req.user.permissions.operator;
exports.isSameUser = (req, userId) => req.user && req.user.id === userId;

exports.getUserName = (firstName, lastName) => `${firstName} ${lastName}`.trim();

module.exports.hashPassword = password => bcrypt.hashSync(password, 5);

module.exports.parseQueryString = (str) => {
  if (!str) return {};
  const queryString = str[0] === '?' ? str.slice(1) : str;

  return queryString.split('&').reduce((acc, fullStringParam) => {
    const paramSeperatorIndex = fullStringParam.indexOf('=');
    const paramName = fullStringParam.slice(0, paramSeperatorIndex);
    const paramValue = fullStringParam.slice(paramSeperatorIndex + 1);

    acc[paramName] = paramValue;

    return acc;
  }, {});
};

const getIpAddressFromReq = (req) => {
  const XForwardedFor = req.headers['x-forwarded-for'];
  if (XForwardedFor) {
    return XForwardedFor.split(',')[0];
  }
  return req.connection.remoteAddress;
};
exports.getIpAddressFromReq = getIpAddressFromReq;

exports.addIpAddressToSession = (req) => {
  req.session.ip = getIpAddressFromReq(req);
};

exports.createFromArray = (model, data) => Promise.all(data.map(d => model.create(d)));

exports.destroyAll = model => model.destroy({ where: {} });

exports.asyncMiddleware = fn =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

exports.getSelectionParameters = (req) => {
  const FV = require('./FieldValidation');
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 20;
  FV('page', page).isInteger({ min: 1 });
  FV('limit', limit).isInteger({ min: 1 });
  const offset = (page - 1) * limit;
  return {
    offset,
    limit,
  };
};
