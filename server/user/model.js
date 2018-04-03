const Sequelize = require('sequelize');
const sequelize = require('../lib/sequelize');
const { generateSymbols } = require('../lib/util');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  status: Sequelize.INTEGER,
  gender: Sequelize.INTEGER,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  birthday: Sequelize.DATE,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  create_date: Sequelize.DATE,
  login_date: Sequelize.DATE,
  verify_pass_code: Sequelize.STRING,
  verify_pass_deadline: Sequelize.DATE,
});

User.getPassCodeAndDeadline = () => ({
  verify_pass_code: generateSymbols(20),
  verify_pass_deadline: moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
});

User.getReferalCode = (first_name, last_name, email) => {
  const saltFactor = 5;
  return bcrypt
    .hashSync(first_name + last_name + email, saltFactor)
    .slice(0, 50);
};

module.exports = User;
