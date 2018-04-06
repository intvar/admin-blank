import { combineReducers } from 'redux';
import user from './user';
import event_log from './event_log';
import event_codes from './event_codes';
import users from './users';

const data = combineReducers({
  user,
  event_log,
  users,
  event_codes,
});
export default data;

