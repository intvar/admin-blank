const Sequelize = require('sequelize');
const sequelize = require('../lib/sequelize');

module.exports = sequelize.define('event_log', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  event_date: Sequelize.DATE,
  user_id: Sequelize.INTEGER,
  is_error: Sequelize.INTEGER,
  event_id: Sequelize.STRING,
  description: Sequelize.STRING,
  debug_info: Sequelize.JSON,
});
