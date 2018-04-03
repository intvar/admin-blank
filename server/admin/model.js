const Sequelize = require('sequelize');
const sequelize = require('../lib/sequelize');

const Admin = sequelize.define('admin', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  status: Sequelize.INTEGER,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  create_date: Sequelize.DATE,
  login_date: Sequelize.DATE,
  verify_pass_code: Sequelize.STRING,
  verify_pass_deadline: Sequelize.DATE,
  permissions: Sequelize.JSON,
});

module.exports = Admin;
