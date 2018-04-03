const { spawn } = require('child-process-promise');

module.exports = async () => {
  await spawn('./node_modules/.bin/sequelize', ['db:migrate:undo:all', 'env=test']);
};
