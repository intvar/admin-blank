const filterSchema = require('./filter.json');
const userSchema = require('./user.json');
const Ajv = require('ajv');

exports.filterValidate = (new Ajv()).compile(filterSchema);
exports.userValidate = (new Ajv()).compile(userSchema);
