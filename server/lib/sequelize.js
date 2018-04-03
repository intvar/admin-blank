const Sequelize = require('sequelize');
const params = require('../config').get('dbParams');

const {
  dialect,
  database,
  user,
  password,
  host,
  port,
} = params;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  logging: false,
});
module.exports = sequelize;
