const EventLog = require('./model');
const FV = require('../lib/FieldValidation');
const { saveEventLog, createError } = require('../lib/util');
const { Op } = require('sequelize');

exports.retrieve = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 40;
  FV('page', page).isInteger({ min: 1 });
  FV('limit', limit).isInteger({ min: 1 });
  const offset = (page - 1) * limit;
  const {
    codes,
    event_date_from,
    event_date_to,
    user_id,
    is_error,
  } = req.query;
  const where = { };
  const order = [
    ['id', 'DESC'],
  ];
  const attributes = { exclude: ['debug_info'] };

  if (event_date_from) {
    FV('event_date_from', event_date_from).isISODate();
    where.event_date = {
      [Op.gte]: event_date_from,
    };
  }

  if (event_date_to) {
    FV('event_date_to', event_date_to).isISODate();
    if (!where.event_date) {
      where.event_date = {};
    }
    where.event_date[Op.lte] = event_date_to;
  }

  if (Array.isArray(codes)) {
    where.event_id = { [Op.in]: codes };
  }

  if (user_id) {
    where.user_id = user_id;
  }
  if (is_error !== undefined) {
    FV('is_error', +is_error).isInteger({ min: 0, max: 1 });
    where.is_error = +is_error;
  }

  const events = await EventLog.findAll({
    where, offset, limit, order, attributes,
  });
  saveEventLog(req, false, 'list of events received successfully');
  res.status(200).send(events);
};

exports.retrieveDebugInfo = async (req, res, next) => {
  const eventId = +req.params.id;
  FV('id', eventId).isInteger();

  const eventLog = await EventLog.findOne({
    where: {
      id: eventId,
    },
  });

  if (!eventLog) {
    next(createError('Event log not found', 404, 'err_event_log_not_found', { params: req.params }));
  }

  res.send(eventLog.debug_info).status(200);
};
