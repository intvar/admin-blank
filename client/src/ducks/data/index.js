import { combineReducers } from 'redux';
import event_log from './event_log';
import event_codes from './event_codes';
import users from './users';
import admins from './admins';

const data = combineReducers({
  event_log,
  users,
  admins,
  event_codes,
});
export default data;

