const userSchema = require('./user.json');
const Ajv = require('ajv');

exports.userValidate = (new Ajv()).compile(userSchema);
