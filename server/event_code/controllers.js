const EventCodes = require('./model');
const { saveEventLog } = require('../lib/util');

exports.retrieve = async (req, res) => {
  const eventCodes = await EventCodes.findAll({ order: ['id'] });
  saveEventLog(req, false, 'list of event codes received successfully');
  res.status(200).send(eventCodes);
};
