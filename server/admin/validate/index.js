const Ajv = require('ajv');
const adminSchema = require('./admin.json');

module.exports = (new Ajv()).compile(adminSchema);
