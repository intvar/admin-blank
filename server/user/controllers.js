const { Op } = require('sequelize');
const User = require('./model');
const {
  saveEventLog,
  createError,
  createErrorFromValidate,
  getSelectionParameters,
} = require('../lib/util');
const { pick, isEmpty } = require('lodash');
const { userValidate } = require('./validate');
const FV = require('../lib/FieldValidation');

const getUserById = async (userId) => {
  const attributes = {
    exclude: ['password'],
  };
  FV('user_id', userId).isInteger({ min: 1 });
  const user = await User.findById(userId, { attributes });
  if (!user) {
    throw createError(`user with id = ${userId} not found`, 404, 'err_user_not_found');
  }
  return user;
};

exports.retrieve = async (req, res) => {
  const { limit, offset } = getSelectionParameters(req);
  const { search_criterion } = req.query;
  const where = {};
  const attributes = {
    exclude: ['password'],
  };

  if (req.query.status !== undefined) {
    where.status = +req.query.status;
  }

  if (search_criterion) {
    where[Op.or] = [
      {
        first_name: {
          [Op.like]: `${search_criterion}%`,
        },
      },
      {
        last_name: {
          [Op.like]: `${search_criterion}%`,
        },
      },
      {
        email: {
          [Op.like]: `${search_criterion}%`,
        },
      },
    ];
  }

  const users = await User.findAll({
    offset,
    limit,
    where,
    attributes,
  });
  saveEventLog(req, false, 'list of users received successfully');
  res.status(200).send(users);
};

exports.retrieveById = async (req, res) => {
  const user_id = +req.params.user_id;
  const user = await getUserById(user_id);
  saveEventLog(req, false, 'user received successfully');
  res.status(200).send(user);
};

exports.update = async (req, res) => {
  const user_id = +req.params.user_id;
  const userData = pick(req.body, ['first_name', 'last_name', 'gender', 'birthday', 'status']);

  if (isEmpty(userData)) {
    throw createError('empty input data', 400, 'err_not_data');
  }

  if (!userValidate(userData)) {
    throw createErrorFromValidate(userValidate);
  }

  await getUserById(user_id);
  await User.update(userData, { where: { id: user_id } });
  saveEventLog(req, false, 'user update successfully');
  res.status(204).send();
};

exports.delete = async (req, res) => {
  const user_id = +req.params.user_id;
  await getUserById(user_id);
  await User.destroy({ where: { id: user_id } });
  saveEventLog(req, false, 'user delete successfully');
  res.status(204).send();
};
