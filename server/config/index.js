const nconf = require('nconf');

const configFile = process.env.CONFIG_FILE;

if (!configFile) {
  throw new Error('Не задан файл config');
}

nconf.argv()
  .env()
  .file({ file: configFile });

module.exports = nconf;
