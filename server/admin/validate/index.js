const Ajv = require('ajv');
const adminSchema = require('./admin.json');

exports.updateValidate = (new Ajv()).compile(adminSchema);

exports.createValidate = (new Ajv()).compile({
  ...adminSchema,
  required: ['email', 'first_name', 'last_name'],
});
