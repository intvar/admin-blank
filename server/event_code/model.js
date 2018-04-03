const Sequelize = require('sequelize');
const sequelize = require('../lib/sequelize');

module.exports = sequelize.define('event_code', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  description: Sequelize.STRING,
});
