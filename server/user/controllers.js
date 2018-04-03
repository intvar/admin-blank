const { Op } = require('sequelize');
const User = require('./model');
const {
  saveEventLog,
  createError,
  createErrorFromValidate,
} = require('../lib/util');
const { pick, isEmpty } = require('lodash');
const { filterValidate, userValidate } = require('./validate');

exports.retrieve = async (req, res) => {
  const filters = {
    page: +req.query.page || 1,
    limit: +req.query.limit || 20,
  };
  const { search_criterion } = req.query;
  const where = {};
  const attributes = {
    exclude: ['password'],
  };

  if (req.query.status !== undefined) {
    filters.status = +req.query.status;
    where.status = +req.query.status;
  }

  if (!filterValidate(filters)) {
    throw createErrorFromValidate(filterValidate);
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
  const { page, limit } = filters;
  const offset = (page - 1) * limit;

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
  const attributes = {
    exclude: ['password'],
  };
  if (!filterValidate({ user_id })) {
    throw createErrorFromValidate(filterValidate);
  }

  const user = await User.findById(user_id, { attributes });
  if (!user) {
    throw createError(`user with id = ${user_id} not found`, 404, 'err_user_not_found');
  }
  saveEventLog(req, false, 'user received successfully');
  res.status(200).send(user);
};

exports.update = async (req, res) => {
  const user_id = +req.params.user_id;
  if (!filterValidate({ user_id })) {
    throw createErrorFromValidate(filterValidate);
  }

  const userData = pick(req.body, ['first_name', 'last_name', 'gender', 'birthday', 'status']);

  if (isEmpty(userData)) {
    throw createError('empty input data', 400, 'err_not_data');
  }

  if (!userValidate(userData)) {
    throw createErrorFromValidate(userValidate);
  }

  const isUserExist = !!(await User.findById(user_id));
  if (!isUserExist) {
    throw createError(`user with id = ${user_id} not found`, 404, 'err_user_not_found');
  }

  await User.update(userData, { where: { id: user_id } });
  saveEventLog(req, false, 'user update successfully');
  res.status(204).send();
};

exports.delete = async (req, res) => {
  const user_id = +req.params.user_id;

  const result = await User.destroy({ where: { id: user_id } });
  if (result === 0) {
    throw createError(`user with id = ${user_id} not found`, 404, 'err_user_not_found');
  }
  saveEventLog(req, false, 'user delete successfully');
  res.status(204).send();
};
