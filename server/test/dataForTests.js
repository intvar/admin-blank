const moment = require('moment');
const {
  USER_GENDER_MALE,
} = require('../constants');

const admins = [{
  id: 1,
  status: 1,
  first_name: 'Raul',
  last_name: 'Kelleyu',
  email: 'raul@admin.com',
  password: '$2a$05$QR/wuHzagkSo2aiYy0byce3JC0lwOaLcr7Svs8ZwjTzUdlMh4memq', // 123qwe321
  verify_pass_code: 'correct_pass_code',
  verify_pass_deadline: moment().add(1, 'hour').toDate(),
}, {
  id: 2,
  status: 2,
  first_name: 'Ronald',
  last_name: 'Reed',
  email: 'ronald@admin.com',
  password: '$2a$05$QR/wuHzagkSo2aiYy0byce3JC0lwOaLcr7Svs8ZwjTzUdlMh4memq', // 123qwe321
  verify_pass_code: 'overdue_pass_code',
  verify_pass_deadline: moment().subtract(1, 'hour').toDate(),
}];

const users = [
  {
    id: 1,
    first_name: 'Jack',
    last_name: 'Daniels',
    email: 'jack@gmail.com',
    password: '$2a$05$QR/wuHzagkSo2aiYy0byce3JC0lwOaLcr7Svs8ZwjTzUdlMh4memq', // 123qwe321
    verify_pass_code: 'pass_code_test',
    verify_pass_deadline: moment().add(1, 'hour').toDate(),
    status: 1,
  }, {
    id: 2,
    first_name: 'Jhon',
    last_name: 'Smith',
    email: 'jhon@gmail.com',
    password: '4353gdg54c3',
    status: 0,
  }, {
    id: 3,
    first_name: 'Robert',
    last_name: 'Johnson',
    email: 'johnson@gmail.com',
    password: '$2a$05$YgWufiNJlrSRnG4RVu2Oq.xLIRXQghBYIPONvenzXGHlG6vM6kyWW',
    verify_pass_code: 'super_pass_code',
    verify_pass_deadline: new Date(),
    status: 1,
  },
  {
    id: 4,
    first_name: 'Tom',
    last_name: 'Smith',
    email: 'jack1@gmail.com',
    password: '$2a$05$YgWufiNJlrSRnG4RVu2Oq.xLIRXQghBYIPONvenzXGHlG6vM6kyWW', // 123qwe
    status: 1,
    gender: USER_GENDER_MALE,
    birthday: '1994-11-25',
  },
];

const event_logs = [{
  id: 11,
  event_id: 'users_list',
  event_date: moment().subtract(1, 'day').toDate(),
}, {
  id: 12,
  event_id: 'users_read',
  debug_info: { error: 'test' },
}, {
  id: 13,
  event_id: 'ico_read',
  is_error: 1,
}, {
  id: 14,
  event_id: 'ico_list',
  event_date: moment().subtract(23, 'hour').toDate(),
}, {
  id: 15,
  event_id: 'ico_create',
  user_id: 1,
  event_date: moment().subtract(23, 'hour').toDate(),
  is_error: 1,
}, {
  id: 16,
  event_id: 'ico_update',
  user_id: 1,
}];

const event_codes = [{
  id: 'ico_list',
  description: 'ico list',
}, {
  id: 'ico_create',
  description: 'ico create',
}];


exports.admins = admins;
exports.users = users;
exports.event_logs = event_logs;
exports.event_codes = event_codes;
